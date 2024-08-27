import React, { useState, useEffect, useRef } from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { NavLink } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'
import { useLocation } from 'react-router-dom'

export const NavBar = () => {

    //HOOKS
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { pathname } = useLocation()
    
    let modalRef = useRef()

    const [ isVisible, setIsVisible] = useState(false)
    const [ showModal, setShowModal ] = useState(false)
   
    
    //SHOWS/HIDE MOBILE MENU
    const handleClick = ()=>{
        setIsVisible(isVisible?false:true)
        setShowModal(false)
    }

    //CONTROLS LOGIN/SIGNUP MODAL + useEffect
    const handleModal = ()=>{
        if(pathname != '/access'){
            setShowModal(!showModal)
        }
        setIsVisible(isVisible?false:true)
    }

     useEffect(()=>{
         let handler = (e)=>{
             if (modalRef.current&&!modalRef.current.contains(e.target)&&e.target.className != 'nav__a') {
                 setShowModal(false)
             }
         }
         document.addEventListener("mousedown", handler);
         
         //DISABLES LISTENER ON UNMOUNT
         return()=>{
             document.removeEventListener("mousedown", handler)
         }
     })

   
       

  return (
    <>
    <nav className='nav'>
        {isVisible && <div className='nav__smoke' onClick={()=>handleClick()}></div>}
        <NavLink className='nav__h1'><h1  >SCROLL VAULT  </h1></NavLink>

        <div className='nav__menu'>  

            <img src='/menu.svg'  className='nav__btn' onClick={()=>handleClick()}></img>
           
            <ul className={!isVisible?'nav__ul -off':'nav__ul -on'}>

                <li className='nav__li'>
                <NavLink onClick={()=>handleClick()} className='nav__a' to={'/'}>
                    Home
                </NavLink>
                </li>
                <li className='nav__li'>
                <NavLink onClick={()=>handleClick()} className='nav__a' to={'/spellforge/browsespells'}>
                    Homebrew spells
                </NavLink>
                </li>
                <li className='nav__li'>
                {user?<NavLink onClick={()=>handleClick()}  className='nav__a' to={'/myvault'}>
                    My vault
                </NavLink>:
                <a onClick={()=>handleModal()} className='nav__a'>My vault</a>
                }
                </li>              
                { !user && (<li className='nav__li'>
                <NavLink onClick={()=>handleClick()} className='nav__a' to={'/access'}>
                    Access
                </NavLink>
                </li>)}
                { user && 
                (<li className='nav__li'>
                <NavLink onClick={()=>logout()} className='nav__a' to={'/access'}>
                    Logout
                </NavLink>
                </li>)}
            </ul>      
        </div>
    </nav> 
     {user?null:
         
            <div className={`access-modal ${showModal?'active':'inactive'}`}>
                <div className='access-modal__wrapper' ref={modalRef}>
                    <RegisterForm  />
                </div>
            </div>
    }
</>
  )
}
