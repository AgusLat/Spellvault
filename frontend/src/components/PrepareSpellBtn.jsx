import React, { useState, useEffect } from 'react'
import { usePrepareSpell } from '../hooks/usePrepareSpell'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLoadCharList } from '../hooks/useLoadCharList'
import { useDeleteSpell } from '../hooks/useDeleteSpell'

export const PrepareSpellBtn = ({spellData}) => {

  //CONTEXT HOOKS
  const {state} = useCharacterContext()
  const {user} = useAuthContext()
  //HOOKS
  const {prepareSpell, spellPrepareError, spellPrepareLoading} = usePrepareSpell()
  const { deleteSpell, deleteSpellLoading, deleteSpellError } = useDeleteSpell()
  const {loadCharList, isLoadingList, loadListError} = useLoadCharList()
  //USE-STATE
  const [prepared, setPrepared] = useState(null)

  const isPrepared = state.activeCharacter.spellData.preparedSpells.some((spell)=> spell._id === spellData._id)



  useEffect(() => {
    
    if(isPrepared){
      setPrepared(true)
    }

    if(!isPrepared){
      setPrepared(false)
    }
  
    
  }, [state])
  



  const handleClick = async ()=>{
    
        setPrepared(null)
        const spellId = spellData._id
        const charId = state.activeCharacter._id
        const userId = user._id
        const token = user.token

        const result = await prepareSpell(spellId, charId ,token)
        
        if (result.isSpellPrepared) {
          setPrepared('')
          await deleteSpell(charId, spellId, token, 'preparedSpells')
          await loadCharList(userId, token)
        }
        if (!result.isSpellPrepared) {
          setPrepared('--prepared')
          await loadCharList(userId, token)
        }
    }

  return (
    <div onClick={()=>{handleClick()}} className='spellCard__add'>
        <img className={`spellCard__details-icon ${prepared? '--prepared':null}`} src='/open-book.svg' ></img>
    </div>
  )
}
