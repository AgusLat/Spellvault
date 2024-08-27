import React from 'react'
import '../css/searchForms.css'


export const NoSearch = () => {
  return ( 
    <div className='search-placeholder'>
        <p>No spells found</p>
        <img className='search-placeholder__image' src='/black-eye.png'></img>
    </div>
    
  )
}
