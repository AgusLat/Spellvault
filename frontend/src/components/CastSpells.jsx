import React from 'react'
import SpellList from './SpellList'
import {Loading} from './Loading'
import { useCharacterContext } from '../hooks/useCharacterContext'
import '../css/castSpells.css'
import { SlotControl } from './SlotControl'
import { EmptySpellList } from './EmptySpellList'

export const CastSpells = () => {

  const {state} = useCharacterContext()



  return (
    <>
    <div className='spellSlotControls'>
      <SlotControl/>
      
    </div>
     {state.activeCharacter == null
      ?
      <Loading/> 
      : 
      (state.activeCharacter.spellData.preparedSpells.length == 0 
        ? 
        <EmptySpellList/>
        :
        <SpellList spellData={state.activeCharacter.spellData.preparedSpells} hasCastControl={true} hasAdd={false} hasDelete={false} hasPrepare={false} />)
     }
    </>
  )
}
