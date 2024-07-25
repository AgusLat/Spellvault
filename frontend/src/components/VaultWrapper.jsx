import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, useLocation} from 'react-router-dom'
import { useCharacterContext } from '../hooks/useCharacterContext'
import {CSSTransition} from 'react-transition-group'

export const VaultWrapper = () => {


  //CONTEXT
  const {state} = useCharacterContext()

  //HOOKS
  const guideRef = useRef(null)
  let location = useLocation()
  //STATES
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if(location.pathname === '/myvault'){
      setIsVisible(true)
    }
  
  }, [location])
  
  

  return (
    <div className='vaultWrapper'>
        <div className='vaultWrapper__navBar'>
          {state.activeCharacter &&  
            <NavLink className={'vaultWrapper__a'} onClick={()=>{setIsVisible(false)}}  to={'/myvault/add'}> Add spells</NavLink>}
          {state.activeCharacter && 
            <NavLink className={'vaultWrapper__a'}  onClick={()=>{setIsVisible(false)}}  to={'/myvault/spells'}>My spells</NavLink>}  
          {state.activeCharacter &&  
            <NavLink className={'vaultWrapper__a'}  onClick={()=>{setIsVisible(false)}}  to={'/myvault/cast'}> Cast spells</NavLink>}
          {state.activeCharacter &&  
            <NavLink className={'vaultWrapper__a'}  onClick={()=>{setIsVisible(false)}}  to={'/myvault/manage'}> Edit or delete character</NavLink>}
           
            <NavLink className={'vaultWrapper__a'}  onClick={()=>{setIsVisible(false)}}  to={'/myvault/create'}> Create character</NavLink>
          
          </div>

        <div className='vaultWrapper__content'>
          <span onClick={()=>{setIsVisible(!isVisible)}} >User guide <img className={'vaultWrapper__arrow' + (isVisible?' --rotate':'')} src="/arrow.svg" alt="" /></span> 
          <hr className='vaultWrapper__hr' />
      

          <CSSTransition in={isVisible} nodeRef={guideRef} timeout={500} classNames='guideTransition'>
            <ul ref={guideRef} className='vaultWrapper__guide'>
              <li>
                Load a character to start, or create one if none exists on your characters list clicking <u> Create character</u>.
              </li>
              <li>
                You can edit your character level and ability scores when your character progresses, or delete it if you don't use it anymore,by clicking <u> Edit or delete character</u>.
              </li>
              <h4>Spells:</h4>
              <li>
                Start adding spells in <u> Add spells</u> filtering by magic school, level or class.
              </li>
              <li>
                You can prepare your spells, or select your favorite ones, in <u>My spells</u>.
              </li>
              <li>
                In <u>Cast spells</u> you can keep track of your available spells slots as you cast the spells in your prefered spell list.
              </li>
            </ul>
          </CSSTransition>
          <hr className={'vaultWrapper__hr'+ (isVisible?'':' --hide')}/>
          <Outlet/>
        </div>
    </div>
  )
}
