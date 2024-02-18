import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {

    const [ isVisible, setIsVisible] = useState(false)

    const handleClick = ()=>{
        setIsVisible(isVisible?false:true)
    }

  return (
    <nav className='nav'>
        {isVisible && <div className='nav__smoke' onClick={()=>handleClick()}></div>}
        <h1 className='nav__h1'>SCROLL VAULT  </h1>

        <div className='nav__menu'>  

            <img src='/menu.svg'  className='nav__btn' onClick={()=>handleClick()}></img>
           
            <ul className={!isVisible?'nav__ul -off':'nav__ul -on'}>

                <li className='nav__li'>
                <NavLink onClick={()=>handleClick()} className='nav__a' to={'/'}>
                    Home
                </NavLink>
                </li>
                <li className='nav__li'>
                <NavLink onClick={()=>handleClick()} className='nav__a' to={'/about'}>
                    About
                </NavLink>
                </li>
                <li className='nav__li'>
                <NavLink onClick={()=>handleClick()}  className='nav__a' to={'/login'}>
                    Login
                </NavLink>
                </li>
                <li className='nav__li'>
                <NavLink onClick={()=>handleClick()} className='nav__a' to={'/signup'}>
                    Signup
                </NavLink>
                </li>
            </ul>      
        </div>
    </nav> 
  )
}
