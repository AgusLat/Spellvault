import { useState } from "react";
import {useAuthContext} from "./useAuthContext"


export const useLogin = ()=> {

    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password)=>{

        setIsLoginLoading(true)
        setLoginError(null)

        //CAMBIAR ANTES DE SUBIR A GITHUB  "https://spellvault-api.vercel.app/api/user/login"
        const response = await fetch("https://spellvault-api.vercel.app/api/user/login",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoginLoading(false)
            setLoginError(json.error)
        }

        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update authContext
            dispatch({type: 'LOGIN', payload: json})
            //LOAD characterContext
            // charContext.dispatch({type: 'LOAD', payload: json.characters_id })
            // setIsLoginLoading(false)
        }
    }

    return {login, isLoginLoading, loginError}
    
}