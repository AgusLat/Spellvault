import { useState } from "react"


export const useCreateSpell = ()=>{

    const [isLoading, setIsLoading] = useState(null)
    const [createSpellError, setCreateSpellError] = useState(null)


    const createSpell = async (spell, token)=>{

        setIsLoading(true)
        setCreateSpellError(null)
        
        const response = await fetch ('https://spellvault-api.onrender.com/api/customspells/createspell',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(spell)
        })

        const json = await response.json()

        if(!response.ok){
            setCreateSpellError(json.error)
            setIsLoading(false)
        }

        if(response.ok){
            setCreateSpellError(null)
            setIsLoading(false)
            return true
        }

    }

    return {createSpell, isLoading, createSpellError}

}