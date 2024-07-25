import React from 'react'
import SpellList from './SpellList'
import {Loading} from './Loading'
import { useCharacterContext } from '../hooks/useCharacterContext'
import '../css/mySpells.css'
import { EmptySpellList } from './EmptySpellList'


export const MySpells = () => {

  const {state} = useCharacterContext()
  

  return (
    <>

    <div className='mySpells'>

      <ul className='mySpells__quickGuide'>
        <li>Prepare spells with 
         <img className='mySpells__text-icon' src='/open-book.svg'></img>,
         or add your favorites if your class does not prepare spells.
        </li>
        <li>Remove spells from the list with 
         <img className='mySpells__text-icon' src='/delete.svg'></img>.
        </li> 
      </ul>
      
      <ul className='mySpells__classes'>
        <h3>Classes that prepare spells: </h3>
        <li>Cleric, Druid, Wizard : CLASS LEVEL + ABILITY MOD</li>
        <li>Paladin, Artificer :  1/2 CLASS LVL + ABILITY MOD</li>
        <h3>Classes that don't prepare spells:</h3>
        <li>Sorcerer, Warlock, Ranger, Arcane trickster, Eldritch knight</li>
      </ul>

    </div>
     {state.activeCharacter == null
      ?
      <Loading/> 
      : 
      (state.activeCharacter.spellData.knownSpells.length == 0 
        ? 
        <EmptySpellList/>
        :
        <SpellList spellData={state.activeCharacter.spellData.knownSpells} hasAdd={false} hasDelete={true} hasPrepare={true} />)
     }
    </>
    
  )
}
