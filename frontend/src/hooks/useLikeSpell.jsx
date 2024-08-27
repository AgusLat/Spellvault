import { useState } from "react"


export const useLikeSpell = ()=>{
    
    const [likeLoading, setLikeLoading] = useState(null)
    const [likeError, setLikeError] = useState(null)


    const likeSpell = async(spellId, userId, token)=>{

        setLikeLoading(true)
        setLikeError(null)
        //'https://spellvault-api.onrender.com/api/spells/like'
        const response = await fetch('https://spellvault-api.onrender.com/api/spells/like',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({spellId,userId})
        })

        const json = await response.json()

        if(!response.ok){
            setLikeError(json.error)
            setLikeLoading(false)
        }

        if(response.ok){
            setLikeError(null)
            setLikeLoading(false)
            return json
        }

    }

    return {likeSpell, likeLoading, likeError}

}