import React, { useEffect, useState } from 'react'
import { useCharacterContext } from '../hooks/useCharacterContext';

//COMPONENTS
import { SpellCard } from './SpellCard'




export default function SpellList({spellData, hasAdd, hasLike, hasDelete, hasPrepare, hasCastControl, hasOrderBy}) {

  const [listOrder, setListOrder] = useState(hasOrderBy?'level':null)
  const [sortedSpells, setSortedSpells] = useState([...spellData])

  
  const { state } = useCharacterContext()



  useEffect(() => {
    let orderedSpells = [...spellData]

    if(listOrder == 'level'){
      orderedSpells.sort((a, b) => {


        const levelsOrder = {
          'Cantrip': 0,
          '1st-level': 1,
          '2nd-level': 2,
          '3rd-level': 3,
          '4th-level': 4,
          '5th-level': 5,
          '6th-level': 6,
          '7th-level': 7,
          '8th-level': 8,
          '9th-level': 9
      };

        const nameA = levelsOrder[a.level]
        const nameB = levelsOrder[b.level]
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
        })
    }

    if(listOrder == 'school'){
      orderedSpells.sort((a, b) => {
        const nameA = a.school.toUpperCase() // ignore upper and lowercase
        const nameB = b.school.toUpperCase() // ignore upper and lowercase
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        // names must be equal
        return 0
        })
    }

    if(listOrder == 'name'){
      
      orderedSpells.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
        })
      }
      
      setSortedSpells(orderedSpells)
   
  }, [listOrder, spellData])
  


  return (
    <div className='results'>
        {hasOrderBy && 
        <div className='results__orderByDiv'>
          <label>Order by </label>
          <select defaultValue={"level"} onChange={(e)=> setListOrder(e.target.value)} >
            <option value="level">Spell level</option>
            <option  value="name">Name</option>
            <option value="school">Magic School</option>

          </select>
        </div>}
        {spellData.length > 0 && <div className='results__titleInfoRefDiv'>
        <span className='results__titleInfoRef--controlsPlaceholder'>BLOCK</span>
          <span className='results__titleInfoRef--namePlaceholder'></span>
          <div className='results__titleInfoRef'>
            <span>Casting time</span>
            <span>Duration</span>
            <span>Components</span>
            </div>
          <span className='results__titleInfoRef--controlsPlaceholder'>BLOCK</span>
          
          {hasAdd && <span className='results__titleInfoRef--controlsPlaceholder'>BLOCK</span>}
          {hasLike && <span className='results__titleInfoRef--controlsPlaceholder'>BLOCK</span>}
          {hasDelete && <span className='results__titleInfoRef--controlsPlaceholder'>BLOCK</span>}
          {hasPrepare && <span className='results__titleInfoRef--controlsPlaceholder'>BLOCK</span>}
          {hasCastControl && <span className='results__titleInfoRef--controlsPlaceholder'>BLOCK BLOCK</span>}
        </div>}
        <ul className='results__list'>
        {sortedSpells.map(item=> {
          return (
              <SpellCard 
                hasAdd={hasAdd}
                hasLike={hasLike} 
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
