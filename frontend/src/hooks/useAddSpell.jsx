import { useState } from "react"


export const useAddSpell = ()=>{
    
    const [spellLoading, setSpellLoading] = useState(null)
    const [spellError, setSpellError] = useState(null)


    const addSpell = async(spellId, charId, token)=>{

        setSpellLoading(true)
        setSpellError(null)

        const response = await fetch('https://spellvault-api.onrender.com/api/profile/addspell',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({spellId,charId})
        })

        const json = await response.json()

        if(!response.ok){
            setSpellError(json.error)
            setSpellLoading(false)
        }

        if(response.ok){
            setSpellError(null)
            setSpellLoading(false)
            return json
        }

    }

    return {addSpell, spellLoading, spellError}

}