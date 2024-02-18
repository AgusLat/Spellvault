import React from 'react'
import '../css/layout.css'

//COMPONTENTS
import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
    <div className='layout'>
        <NavBar/>
        <div className='pages'>
            <Outlet/>
        </div>
    </div>
  )
}
