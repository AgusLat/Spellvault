import { useState, useEffect } from "react"
import { useCharacterContext } from "./useCharacterContext"



export const useLoadCharacter = ()=>{

    const [isLoading, setIsLoading] = useState(null)
    const [loadError, setLoadError] = useState(null)

    const { dispatch, state } = useCharacterContext()



    const loadCharacter = async ( charId, userId, token )=>{

        setIsLoading(true)

        //CAMBIAR URL CUANDO SE SUBA A GITHUB "https://spellvault-api.vercel.app/api/profile/loadcharacter"
        const response = await fetch('https://spellvault-api.vercel.app/api/profile/loadcharacter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({charId, userId}) 
        })

        const json = await response.json()

        if(!response.ok){
            setLoadError(json.error)
            setIsLoading(false)
        }

        if(response.ok){
            setLoadError(null)
            //UPDATES STATE
            dispatch({type:'SET-ACTIVE', payload: {...json}})
            setIsLoading(false)
            return json
        }
    }

    return { loadCharacter, isLoading, loadError}

}