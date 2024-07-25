import React from 'react'
import '../css/spellForgePage.css'
import { Loading } from '../components/Loading'
import { useNavigation } from 'react-router-dom'

export const SpellForgePage = () => {

  const navigation = useNavigation()


  
  
  
  
  if(navigation.state === "loading" ){
    return <>
          <Loading/>
    </>
          
  }

  return (
    <div className='spellForgePage'>
        <h1>This section is under development..</h1>
    </div>
  )
}
