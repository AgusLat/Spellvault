import React, { useState } from 'react'
import '../css/characterSelector.css'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { useLoadCharacter } from '../hooks/useLoadCharacter'
import { useAuthContext } from '../hooks/useAuthContext'

export const CharacterSelector = ({charName, charId}) => {

  const {state} = useCharacterContext()
  const {user} = useAuthContext()
  const {loadCharacter, isLoading, loadError} = useLoadCharacter()


  const handleClick = async ()=>{
    
    await loadCharacter(charId, user._id ,user.token)

  }

  return (
   
        <div className='characterSelector'>
          <p className='characterSelector__name'>{charName}</p>
          <button disabled={isLoading} onClick={()=>{handleClick()}}>
            {isLoading?
            <img className='characterSelector__icon --active' src='/loading.svg'></img> :
            <img className={
            `characterSelector__icon ${
              state.activeCharacter === null? '':
              (state.activeCharacter._id === charId?' --active':'')}`
          } src="/scroll-papyrus.svg" alt="magic-book" />}
          
          </button>
          {loadError && <p>{loadError}</p>}
        </div>
  )
}
