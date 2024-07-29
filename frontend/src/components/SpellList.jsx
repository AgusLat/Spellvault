import React from 'react'
import { useCharacterContext } from '../hooks/useCharacterContext';

//COMPONENTS
import { SpellCard } from './SpellCard'




export default function SpellList({spellData, hasAdd, hasDelete, hasPrepare, hasCastControl}) {
  
  const { state } = useCharacterContext()


  return (
    <div className='results'>
        <ul className='results__list'>
        {spellData
            .sort((a, b) => {
              const nameA = a.name.toUpperCase(); // ignore upper and lowercase
              const nameB = b.name.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              // names must be equal
              return 0;
            })
            .map(item=> {

              return (
                  <SpellCard 
                    hasAdd={hasAdd} 
                    hasDelete={hasDelete} 
                    hasPrepare={hasPrepare}
                    hasCastControl={hasCastControl} 
                    key={item._id} 
                    spellId={item._id} 
                    spellData={item}>
                  </SpellCard>
                  )
              }
            )
        }
        </ul>
    </div>
  )
}
