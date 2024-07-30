import { useState } from "react"
import { useCharacterContext } from "./useCharacterContext"



export const useDeleteCharacter = ()=>{

    const [isLoading, setIsLoading] = useState(null)
    const [deleteError, setDeleteError] = useState(null)

    const deleteCharacter = async ( userId, charId, token )=>{

        setIsLoading(true)

        //CAMBIAR URL CUANDO SE SUBA A GITHUB "https://spellvault-api.onrender.com/api/profile/deletecharacter"
        const response = await fetch('https://spellvault-api.onrender.com/api/profile/deletecharacter', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({userId, charId})
        })

        const json = await response.json()

        if(!response.ok){
            setDeleteError(json.error)
            setIsLoading(false)
        }

        if(response.ok){
            setDeleteError(null)
            setIsLoading(false)
        }
    }

    return { deleteCharacter, isLoading, deleteError}

}