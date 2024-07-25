import { useState } from "react"


export const useDeleteSpell = ()=>{
    
    const [deleteSpellLoading, setDeleteSpellLoading] = useState(null)
    const [deleteSpellError, setDeleteSpellError] = useState(null)


    const deleteSpell = async(charId, spellId, token, path)=>{

        setDeleteSpellLoading(true)
        setDeleteSpellError(null)

        const response = await fetch('https://spellvault-api.vercel.app/api/profile/deletespell',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({charId,spellId, path})
        })

        const json = await response.json()

        if(!response.ok){
            setDeleteSpellError(json.error)
            setDeleteSpellLoading(false)
        }

        if(response.ok){
            setDeleteSpellError(null)
            setDeleteSpellLoading(false)
            return json
        }

    }

    return {deleteSpell, deleteSpellLoading, deleteSpellError}

}