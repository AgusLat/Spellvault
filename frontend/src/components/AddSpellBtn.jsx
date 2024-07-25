import React, { useState } from 'react'
import { useAddSpell } from '../hooks/useAddSpell'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLoadCharList } from '../hooks/useLoadCharList'

export const AddSpellBtn = ({spellData}) => {


  //CONTEXT HOOKS
  const {state} = useCharacterContext()
  const {user} = useAuthContext()
  //HOOKS
  const {addSpell, spellError, spellLoading} = useAddSpell()
  const {loadCharList, isLoadingList, loadListError} = useLoadCharList()
  //USE-STATE
  const [isKnown, setIsknown] = useState('')

  const handleClick = async ()=>{

        setIsknown(null)
        const spellId = spellData._id
        const charId = state.activeCharacter._id
        const userId = user._id
        const token = user.token

        const result = await addSpell(spellId, charId ,token)
        
        if (result.isSpellKnown) {
          setIsknown('--known')
        }
        if (!result.isSpellKnown) {
          setIsknown('--notKnown')
          await loadCharList(userId, token)
        }
    }


  return (
    <div onClick={()=>{handleClick()}} className='spellCard__add'>
        <img className={`spellCard__details-icon ${isKnown}`} src='/add.svg' ></img>
    </div>
  )
}
