import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


export const useEditCharacter = ()=>{

    const {user} = useAuthContext()

    const [isEditLoading, setIsEditLoading] = useState(null)
    const [editError, setEditError] = useState(null)

    const editCharacter = async ( body )=>{

        setIsEditLoading(true)

        const response = await fetch('https://spellvault-api.onrender.com/api/profile/editcharacter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(body) 
        })

        const json = await response.json()

        if(!response.ok){
            setEditError(json.error)
            setIsEditLoading(false)
        }

        if(response.ok){
            setEditError(null)
            setIsEditLoading(false)
            return json
        }
    }

    return { editCharacter, isEditLoading, editError}

}