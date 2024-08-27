import { useState } from "react"


export const usePrepareSpell = ()=>{
    
    const [prepareSpellLoading, setPrepareSpellLoading] = useState(null)
    const [prepareSpellError, setPrepareSpellError] = useState(null)


    const prepareSpell = async(spellId, isCustom, charId, token)=>{

        setPrepareSpellLoading(true)
        setPrepareSpellError(null)
        //https://spellvault-api.onrender.com/api/profile/preparespell
        const response = await fetch('https://spellvault-api.onrender.com/api/profile/preparespell',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({spellId, isCustom, charId})
        })

        const json = await response.json()

        if(!response.ok){
            setPrepareSpellError(json.error)
            setPrepareSpellLoading(false)
        }

        if(response.ok){
            setPrepareSpellError(null)
            setPrepareSpellLoading(false)
            return json
        }

    }

    return {prepareSpell, prepareSpellLoading, prepareSpellError}

}