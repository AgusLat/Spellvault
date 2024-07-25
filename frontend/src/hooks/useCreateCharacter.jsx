import { useState } from "react"
import { useCharacterContext } from "./useCharacterContext"


export const useCreateCharacter = ()=>{

    const [isLoading, setIsLoading] = useState(null)
    const [createCharError, setCreateCharError] = useState(null)


    const createCharacter = async (character, token)=>{

        setIsLoading(true)
        setCreateCharError(null)
       //CAMBIAR URL CUANDO SE SUBA A GITHUB "https://spellvault-api.vercel.app/api/profile/createcharacter"
        const response = await fetch ('https://spellvault-api.vercel.app/api/profile/createcharacter',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(character)
        })

        const json = await response.json()

        if(!response.ok){
            setCreateCharError(json.error)
            setIsLoading(false)
        }

        if(response.ok){
            setCreateCharError(null)
            setIsLoading(false)
            return true
        }

    }

    return {createCharacter, isLoading, createCharError}

}