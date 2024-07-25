import { useState } from "react";
import {useAuthContext} from "./useAuthContext"


export const useSignup = ()=> {

    const [signupError, setSignupError] = useState(null)
    const [isSignupLoading, setIsSignupLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password)=>{

        setIsSignupLoading(true)
        setSignupError(null)

        //CAMBIAR ANTES DE SUBIR A GITHUB  "https://spellvault-api.vercel.app/api/user/signup"
        const response = await fetch("https://spellvault-api.vercel.app/api/user/signup",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsSignupLoading(false)
            setSignupError(json.error)
        }

        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update authContext
            dispatch({type: 'LOGIN', payload: json})
            setIsSignupLoading(false)
        }
    }

    return {signup, isSignupLoading, signupError}
    
}