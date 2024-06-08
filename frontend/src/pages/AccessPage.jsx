import React, { useState } from 'react'
import { useNavigation } from 'react-router-dom'
import '../css/accessPage.css'
//COMPONENTS
import { RegisterForm } from '../components/RegisterForm'
import { Loading } from '../components/Loading'

export const AccessPage = () => {

  const [accessMethod, setAccessMethod] = useState('SIGNUP')
  const navigation = useNavigation()

  if(navigation.state === "loading" ){
    return <>
          <Loading/>
    </>
          
  }

  return (
    <div className='accessPage'>  
        <RegisterForm accessType={accessMethod} />
    </div>
  )
}
