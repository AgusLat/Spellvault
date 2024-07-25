import { useState } from "react"

export const useUpdateSlots = ()=>{

    const [updateSlotLoading, setUpdateSlotLoading] = useState(null)
    const [updateSlotError, setUpdateSlotError] = useState(null)

    const updateSlots = async (charId, slots, token)=>{
        
        setUpdateSlotLoading(true)
        setUpdateSlotError(null)

        const response = await fetch('https://spellvault-api.vercel.app/api/profile/updateslots',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({charId, slots})
        })

        const json = await response.json()

        if(!response.ok){
            setUpdateSlotError(json.error)
            setUpdateSlotLoading(false)
        }

        if(response.ok){
            setUpdateSlotError(null)
            setUpdateSlotLoading(false)
            return json
        }

    }

    return { updateSlots, updateSlotLoading, updateSlotError }


}