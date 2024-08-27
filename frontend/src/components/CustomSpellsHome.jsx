import React, {useState, useEffect, useRef} from 'react'
import { Navigate, NavLink, useNavigation, useLocation } from 'react-router-dom'
import { AdvancedSearchForm } from './AdvancedSearchForm.jsx'
import { MostPopularSpells } from './MostPopularSpells.jsx'
import { useAuthContext } from '../hooks/useAuthContext.jsx'
import { Loading } from './Loading.jsx'
import { RegisterForm } from './RegisterForm.jsx'


export const CustomSpellsHome = () => {

//USE STATE
const [ isVisible, setIsVisible] = useState(false)
const [ showModal, setShowModal ] = useState(false)
const [isPressed, setIsPressed] = useState(false)

//HOOKS
const { user } = useAuthContext()
const { pathname } = useLocation()
const navigation = useNavigation()
let modalRef = useRef()

  


//CONTROLS LOGIN/SIGNUP MODAL + useEffect
const handleModal = ()=>{
 if(pathname != '/access'){
     setShowModal(!showModal)
 }
 setIsVisible(isVisible?false:true)
}

useEffect(()=>{
    let handler = (e)=>{
        if (modalRef.current&&!modalRef.current.contains(e.target)&&e.target.className != 'vaultWrapper__a') {
            setShowModal(false)
        }
    }
    document.addEventListener("mousedown", handler);

    //DISABLES LISTENER ON UNMOUNT
    return()=>{
        document.removeEventListener("mousedown", handler)
    }
})




if(navigation.state === "loading" ){
  return <><Loading/> </>
}



  return (
    <>
    <div className='customSpellsHome'>
      <div className='customSpellsHome__topFiveDiv'>
        <h2>
          TOP 5 LEGENDARY SPELLS CRAFTED BY OUR COMMUNITY 
        </h2>
        <MostPopularSpells/>
        </div>

        <div className='customSpellsHome__infoDiv'>
          <div className='customSpellsHome__subInfoDiv'>
            <p>
              <strong >Our community is bursting with creativity, and these top 5 favorites are just the beginning!</strong>
            </p> 
            <p>
              Dive into our spell library using the <b>search bar</b> below to explore countless other unique and powerful creations. 
            </p>
          </div>
          <div className='customSpellsHome__subInfoDiv'>
            <p>
              Or, if you’re feeling inspired, head over to our <b>crafting section </b>and conjure up your own spell to share with fellow adventurers. 
            </p>
          {user?
            <NavLink 
              className={'customSpellsHome__a' + (isPressed? ' --navigatePressed': '')}
              onTouchStart={()=>{setIsPressed(true)}}
              onTouchEnd={()=>{setIsPressed(false)}}
              onMouseDown={()=>{setIsPressed(true)}}
              onMouseUp={()=>{setIsPressed(false)}}  
              to={'/spellforge/createspells'}>
                CREATE CUSTOM SPELL
            </NavLink>:
            <a 
              onClick={()=>handleModal()}
              onTouchStart={()=>{setIsPressed(true)}}
              onTouchEnd={()=>{setIsPressed(false)}}
              onMouseDown={()=>{setIsPressed(true)}}
              onMouseUp={()=>{setIsPressed(false)}}  
              className={'customSpellsHome__a' + (isPressed? ' --navigatePressed': '')}>
                CREATE CUSTOM SPELL
            </a>
          }
          </div>
        </div>
        
              <hr className='customSpellsHome__hr' />
      
      <div className='customSpellsHome__searchDiv'>
        <AdvancedSearchForm searchCustoms={true} hasCustom={false} hasOrder={true} hasLike={true}/>
      </div>
    </div>
    {user?null:
         
      <div className={`access-modal ${showModal?'active':'inactive'}`}>
          <div className='access-modal__wrapper' ref={modalRef}>
              <RegisterForm  />
          </div>
      </div>
}</>
  )
}
