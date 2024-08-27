import { useState } from "react"

export const useAdvancedSearch = ()=>{

  const [fetchLoading, setFetchLoading] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  const fetchSpellAdvanced = async (paramsObj)=>{

    setFetchLoading(true)
    setFetchError(false)
      
      try {
          const params = new URLSearchParams(paramsObj)
          
          const response = await fetch(`https://spellvault-api.onrender.com/api/spells/filter?${params.toString()}`)
    
          const spellData = await response.json()
          setFetchLoading(false)

          // console.log(spellData) //ARRAY OF SPELLS OBJECTS
          return spellData

        } catch (error) {
          setFetchError(error)
          setFetchLoading(false)
          console.error(error)
        }
  }

  return {fetchSpellAdvanced, fetchLoading, fetchError}

}