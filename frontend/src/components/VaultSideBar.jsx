import React, { useRef } from 'react'
import { CharacterSelector } from './CharacterSelector'
import { CharacterInfo } from './CharacterInfo'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { CSSTransition } from 'react-transition-group'

export const VaultSideBar = ({showSidebar}) => {

  
  const {state} = useCharacterContext()
  const sideBarRef = useRef(null)


  return (
    <CSSTransition nodeRef={sideBarRef} in={showSidebar} classNames='sidebarTransition' timeout={800}>
      <div ref={sideBarRef} className={'vaultSideBar'}>
        {state.characterList.map( (e, i) =>{ return <CharacterSelector key={e._id} charId={e._id} charName={e.name} /> })}
        {state.activeCharacter == null?null:<CharacterInfo character={state.activeCharacter}/>}
      </div>
    </CSSTransition>
  )
}
