import React, { useEffect, useRef, useState } from 'react'
import '../css/characterInfo.css'
import { calculateModifier, calculateProficiency } from '../datadnd/dndFunctions'
import { abilityMod, spellKnownByClass, spellSlotsByClass } from '../datadnd/dndClasses'
import { useCharacterContext } from '../hooks/useCharacterContext'


export const CharacterInfo = ({character}) => {
  

  const { state } = useCharacterContext()
  
useEffect(() => {

}, [character])

  

  return (
    <>
    {character == null? <div>No loaded characters</div>
    : 
      <div className='characterInfo'>
        
        <table className='characterInfo__table'>
              <thead>
                <tr>
                  <th className='characterInfo__rowTitle' colSpan="3">ABILITY SCORES</th>
                </tr>
             </thead>
              <tbody className='characterInfo__table-body'>
                <tr className='characterInfo__table-row'>
                  <td  className='characterInfo__table-data--left'>STR</td>
                  <td className='characterInfo__table-data--center'>{character.stats.STR}</td>
                  <td className='characterInfo__table-data--right'>{character.stats.STR >= 12? '+':''}{calculateModifier(character.stats.STR)}</td>

                </tr>
                <tr className='characterInfo__table-row'>
                  <td className='characterInfo__table-data--left'>DEX</td>
                  <td className='characterInfo__table-data--center'>{character.stats.DEX}</td>
                  <td className='characterInfo__table-data--right'>{character.stats.DEX >= 12? '+':''}{calculateModifier(character.stats.DEX)}</td>
                </tr>
                <tr className='characterInfo__table-row'>
                  <td className='characterInfo__table-data--left'>CON</td>
                  <td className='characterInfo__table-data--center'>{character.stats.CON}</td>
                  <td className='characterInfo__table-data--right'>{character.stats.CON >= 12? '+':''}{calculateModifier(character.stats.CON)}</td>

                </tr>
                <tr className='characterInfo__table-row'> 
                  <td className='characterInfo__table-data--left'>INT</td>
                  <td className='characterInfo__table-data--center'>{character.stats.INT}</td>
                  <td className='characterInfo__table-data--right'>{character.stats.INT >= 12? '+':''}{calculateModifier(character.stats.INT)}</td>

                </tr>
                <tr className='characterInfo__table-row'>
                  <td className='characterInfo__table-data--left'>WIS</td>
                  <td className='characterInfo__table-data--center'>{character.stats.WIS}</td>
                  <td className='characterInfo__table-data--right'>{character.stats.WIS >= 12? '+':''}{calculateModifier(character.stats.WIS)}</td>

                </tr>
                <tr className='characterInfo__table-row'>
                  <td className='characterInfo__table-data--left'>CHA</td>
                  <td className='characterInfo__table-data--center'>{character.stats.CHA}</td>
                  <td className='characterInfo__table-data--right'>{character.stats.CHA >= 12? '+':''}{calculateModifier(character.stats.CHA)}</td>

                </tr>
              </tbody>
            </table>
        <div className='characterInfo__row'>
          <p className='characterInfo__rowTitle'><b>NAME</b></p>
          <p>{character.name}</p>
        </div>
        <div className='characterInfo__row'>
          <p className='characterInfo__rowTitle'><b>CLASS</b></p> 
          <p>{character.charClass.charAt(0).toUpperCase() + character.charClass.slice(1)}</p>
        </div>
        <div className='characterInfo__row'>
          <p className='characterInfo__rowTitle'><b>LEVEL</b></p>
          <p>{character.level}</p>
        </div>
        <div className='characterInfo__row'>
          <p className='characterInfo__rowTitle'><b>PROFICIENCY</b></p>
          <p>+{ calculateProficiency(character.level)}</p>
        </div>
        <div className='characterInfo__row'>
          <p className='characterInfo__rowTitle'><b>SPELLCASTING ABILITY </b></p>
          <p>{abilityMod[character.charClass]}  {" +"} 
            {calculateModifier(character.stats[abilityMod[character.charClass]]) + 
            calculateProficiency(character.level)}
          </p>
        </div>
        <div className='characterInfo__row'>
          <p className='characterInfo__rowTitle'><b>SPELL SAVE DC</b></p>
          <p>
            {8 + calculateModifier(character.stats[abilityMod[character.charClass]]) + 
            calculateProficiency(character.level)}
          </p>
        </div>
        <div className='characterInfo__row'>
          <p className='characterInfo__rowTitle'>
            <b>KNOWN SPELLS BY LEVEL</b> 
          </p>
          <p>
            {spellKnownByClass[character.charClass]?spellKnownByClass[character.charClass][character.level]: 'No limit'}
          </p>
        </div>
          <ul className='characterInfo__ul'>
          <p className='characterInfo__rowTitle'><b>SPELL SLOTS:</b></p> 
            {spellSlotsByClass[character.charClass]
              ?
              spellSlotsByClass[character.charClass][character.level].map( (e, i)=> 
                (Object.values(e) != 0)
                ?
                <li key={i}>{`${Object.keys(e)}: `}<span>{`${Object.values(e)}`}</span></li>
                :
                null)
              :
              spellSlotsByClass.general[character.level].map( (e, i)=> 
                (Object.values(e) != 0)
                ?
                <li key={i}>{`${Object.keys(e)}: `}<span>{`${Object.values(e)}`}</span></li>
                :
                null)
              }
            </ul>
          </div>
        }
    </>       
  )
}
