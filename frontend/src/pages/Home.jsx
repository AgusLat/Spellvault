import React, { useState, useRef } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'
import '../css/home.css'
import '../css/accessPage.css'

//COMPONENTS
import { QuickSearchForm } from '../components/QuickSearchForm'
import { AdvancedSearchForm } from '../components/AdvancedSearchForm'
import { Loading } from '../components/Loading'



export const Home = () => {

  
  //LOADER DATA
  const {count, spells} = useLoaderData()
  const navigation = useNavigation()

  const [isAdvanced, setIsAdvanced] = useState(false)
  const [ isPressed, setIsPressed]  = useState(false)

  const nodeRef = useRef(null) 

  const handleClick = ()=>{
    if (nodeRef.current) {
      nodeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if(navigation.state === "loading" ){
    return <>
          <Loading/>
    </>
          
  }


  return (

    <div className='home-page'>
      <div className='landing'>
        <div className='landing__introduction'>
          <h2 className='landing__h2'>AN ARCANE LIBRARY FOR D&D 5e</h2>
          <p className='landing__p'><strong>SPELL VAULT</strong> is your go-to tool for managing <strong>D&D</strong> spells and characters. Easily organize, assign, and explore both official <strong>D&D 5th edition</strong> spells and custom homebrew creations.</p>
          {/* 
          <div
            className={'landing__goSearch' +  (isPressed? ' --goSearchPressed': '')}
            onTouchStart={()=>{setIsPressed(true)}}
            onTouchEnd={()=>{setIsPressed(false)}}
            onMouseDown={()=>{setIsPressed(true)}}
            onMouseUp={()=>{setIsPressed(false)}}
            onClick={()=>{handleClick()}} 
            > 
            <strong>START YOUR SEARCH BELOW </strong>
            <img src='/down-arrow.svg' alt='down-arrow-icon'></img>
          </div> */}
        </div>
      </div>


      <div className='search-selector'>
        <button className={'search-selector__btn'+ (!isAdvanced? ' --selected':'')} onClick={()=>{setIsAdvanced(false)}}>QUICK SEARCH</button>
        <button className={'search-selector__btn'+ (isAdvanced? ' --selected':'')}  onClick={()=>{setIsAdvanced(true)}}>ADVANCED SEARCH</button>
      </div>

     
      <CSSTransition appear={true} in={isAdvanced} nodeRef={nodeRef} timeout={800} classNames="search-appear">
        <div className='search-form-container' ref={nodeRef}>
            {isAdvanced && <AdvancedSearchForm  spells={spells}/>}
            {!isAdvanced && <QuickSearchForm  count={count} spells={spells}/>}
        </div>
      </CSSTransition>
     
    
      
    </div>
  )
}




//LOADER
export const homeLoader = async () => {
  try {
      //ROUTE CAN BE MODIFIED TO 'http://localhost:4000/api/spells'
      const response = await fetch("https://spellvault-api.onrender.com/api/spells/") 

      const data = await response.json()
      // console.log("LOADER DATA", {count: data.length, spells: data})
       return ({count: data.length, spells: data})
      // return defer({data})


        
    } catch (error) {
      console.error(error)
      
      return null
    }
}