import React, { useState } from 'react'
import '../css/characterSelector.css'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { useLoadCharacter } from '../hooks/useLoadCharacter'
import { useAuthContext } from '../hooks/useAuthContext'

export const CharacterSelector = ({charName, charId}) => {

  const [isPressed, setIsPressed] = useState(false)

  const {state} = useCharacterContext()
  const {user} = useAuthContext()
  const {loadCharacter, isLoading, loadError} = useLoadCharacter()


  const handleClick = async ()=>{
    
    await loadCharacter(charId, user._id ,user.token)

  }

  return (
   
        <div 
          className={'characterSelector' + (isPressed? ' --selectorPressed': '')} 
          onTouchStart={()=>{setIsPressed(true)}}
          onTouchEnd={()=>{setIsPressed(false)}}
          onMouseDown={()=>{setIsPressed(true)}}
          onMouseUp={()=>{setIsPressed(false)}}
          onClick={()=>{handleClick()}}>
          <button disabled={isLoading} onClick={()=>{handleClick()}}>
            {isLoading?
            <img className='characterSelector__icon --active' src='/loading.svg'></img> :
            <img className={
              `characterSelector__icon ${
                state.activeCharacter === null? '':
                (state.activeCharacter._id === charId?' --active':'')}`
              } src="/scroll-papyrus.svg" alt="magic-book" />}
          
          </button>
              <p className='characterSelector__name'>{charName}</p>
          {loadError && <p>{loadError}</p>}
        </div>
  )
}
