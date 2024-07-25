import React from 'react'
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

  const handleClick = async()=>{

    const charId = state.activeCharacter._id
    const spellId = spellData._id
    const userId = user._id
    const token = user.token

    await deleteSpell(charId, spellId, token, 'knownSpells') //AGREGAR EL PATH
    await loadCharList(userId, token)

  }



  return (
    <div onClick={()=>{handleClick()}} className='spellCard__add'>
        <img className='spellCard__details-icon' src='/delete.svg' ></img>
    </div>
  )
}
