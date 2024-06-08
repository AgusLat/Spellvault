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
  const nodeRef = useRef(null) 

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
          <p className='landing__p'>"SCROLL VAULT" is a tool that was made for helping D&D players organize their spells, assign them to different characters, or just check a specific spell information in a quick way.</p>
          <p className='landing__p'>The spells that are available is a combination of the official spell list for D&D 5th edition and homebrew spells, which you can create your own or rate other people's creation.</p>
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
      const response = await fetch("https://spellvault-api.vercel.app/api/spells/") 

      const data = await response.json()
      // console.log("LOADER DATA", {count: data.length, spells: data})
       return ({count: data.length, spells: data})
      // return defer({data})


        
    } catch (error) {
      console.error(error)
      
      return null
    }
}