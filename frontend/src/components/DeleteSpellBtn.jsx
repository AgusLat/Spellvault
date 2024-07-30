import React, {useState} from 'react'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useDeleteSpell } from '../hooks/useDeleteSpell'
import { useLoadCharList } from '../hooks/useLoadCharList'

export const DeleteSpellBtn = ({spellData}) => {

  //CONTEXT HOOKS
  const { user } = useAuthContext()
  const { state } = useCharacterContext()
  //HOOKS
  const { deleteSpell, deleteSpellLoading, deleteSpellError } = useDeleteSpell()
  const { loadCharList, isLoadingList, loadListError } = useLoadCharList()
  //USE-STATE
  const [ isPressed, setIsPressed] = useState(false)
  

  const handleClick = async()=>{

    const charId = state.activeCharacter._id
    const spellId = spellData._id
    const userId = user._id
    const token = user.token

    await deleteSpell(charId, spellId, token, 'knownSpells') //AGREGAR EL PATH
    await loadCharList(userId, token)

  }



  return (
    <div 
      className={'spellCard__add' + (isPressed? ' --deletePressed': '')}
      onTouchStart={()=>{setIsPressed(true)}}
      onTouchEnd={()=>{setIsPressed(false)}}
      onMouseDown={()=>{setIsPressed(true)}}
      onMouseUp={()=>{setIsPressed(false)}}
      onClick={()=>{handleClick()}} 
    >
        {deleteSpellLoading ? <img className='spellCard__details-loading-icon' src='/loading.svg'></img>:
        <img className='spellCard__details-icon' src='/delete.svg' ></img>
        }
    </div>
  )
}
