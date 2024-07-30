import { useState } from "react"
import { useCharacterContext } from "./useCharacterContext"



export const useLoadCharList = ()=>{

    const [isLoadingList, setIsLoadingList] = useState(null)
    const [loadListError, setLoadListError] = useState(null)

    const { dispatch } = useCharacterContext()


    const loadCharList = async ( userId, token )=>{

        setIsLoadingList(true)

        //CAMBIAR URL CUANDO SE SUBA A GITHUB "https://spellvault-api.onrender.com/api/profile/loadcharacter"
        const response = await fetch('https://spellvault-api.onrender.com/api/profile/loadcharacterlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({_id: userId}) 
        })

        const json = await response.json()

        if(!response.ok){
            setLoadListError(json.error)
            setIsLoadingList(false)
        }

        if(response.ok){
            setLoadListError(null)
            //UPDATES STATE
            dispatch({type:'LOAD-LIST', payload: json})
            setIsLoadingList(false)
            return json
        }
    }

    return { loadCharList, isLoadingList, loadListError}

}