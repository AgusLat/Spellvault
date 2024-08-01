import React from 'react'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { useLogin } from '../hooks/useLogin'
import '../css/accessPage.css'
import { TermsAndConditions } from './TermsAndConditions'


export const RegisterForm = () => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[accessType, setAccessType] = useState('SIGNUP')
  const [showModal, setShowModal] = useState(false)


  //HOOKS
  const{signup, isSignupLoading, signupError} = useSignup();
  const{login, isLoginLoading, loginError} = useLogin();

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(accessType=='SIGNUP'){
      await signup(email,password)
    }

    if(accessType=='LOGIN'){
      await login(email,password)
    }
  }

  const showTerms =()=>{
    setShowModal(!showModal)
  }


  return (
    <div className='registerForm'>
          <div className='registerForm__selector'>
            <button className={accessType == 'SIGNUP' ?'registerForm__btn--selected': 'registerForm__btn'} 
                    onClick={()=>{setAccessType('SIGNUP')}}>
                    SIGN UP
            </button>
            <button className={accessType == 'LOGIN' ?'registerForm__btn--selected': 'registerForm__btn'} 
                    onClick={()=>{setAccessType('LOGIN')}}>
                    LOGIN
            </button>
          </div>
        <form className='registerForm__form' onSubmit={handleSubmit}>

          <div className='registerForm__pWrapper'>
            <p>Don't have an account yet?</p>
            <p>Register to have access to all the features</p>
          </div>

          <div className='registerForm__inputWrapper'>    
            <label htmlFor="">Email</label>
              <input name='email' type="email" className='registerForm__input' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
          </div>
          <div className='registerForm__inputWrapper'>
              <label htmlFor="">Password</label>
              <input name='password' type="password" className='registerForm__input' onChange={(e)=>{setPassword(e.target.value)}} value={password} />
          </div>

            {(accessType == 'SIGNUP') &&
                <div className='registerForm__inputWrapper'>
                    <label className='registerForm__termsAndConditions'>
                      <a onClick={()=>{showTerms()}} >Terms and conditions</a> <input name='termsAndCon' type="checkbox" required  />
                    </label>
                </div>
            }
            
            {(accessType=='SIGNUP') &&<button className='registerForm__submit' disabled={isSignupLoading}>SIGN UP</button>}
            {(accessType=='LOGIN') &&<button className='registerForm__submit' disabled={isLoginLoading}>LOG IN</button>}    
        </form>

        <div className='registerForm__error'>
          {signupError && accessType=='SIGNUP'? <div>{signupError}</div>: null}
          {loginError && accessType=='LOGIN'?  <div>{loginError}</div>: null}
        </div>
        {showModal && 
          <div className='termsAndConditions'>
            <div className='termsAndConditions__title'>
              Terms and Conditions of Spellvault 
              <button className='termsAndConditions__closeBtn' onClick={()=>{setShowModal()}}> X </button>
            </div>
            <TermsAndConditions />
          </div>}
    </div>
  )
}
