import React from 'react'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { useLogin } from '../hooks/useLogin'
import '../css/accessPage.css'


export const RegisterForm = () => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[accessType, setAccessType] = useState('SIGNUP')


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
                    <label htmlFor="">
                      Terms and conditions <input name='termsAndCon' type="checkbox"  />
                    </label>
                </div>
            }
            
            {(accessType=='SIGNUP') &&<button className='registerForm__submit' disabled={isSignupLoading}>Sign up</button>}
            {(accessType=='LOGIN') &&<button className='registerForm__submit' disabled={isLoginLoading}>Log in</button>}    
        </form>

        <div className='registerForm__error'>
          {signupError && accessType=='SIGNUP'? <div>{signupError}</div>: null}
          {loginError && accessType=='LOGIN'?  <div>{loginError}</div>: null}
        </div>
    </div>
  )
}
