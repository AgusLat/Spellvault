

export const useAdvancedSearch = (playerClass, school, level)=>{


    const fetchSpellAdvanced = async (playerClass, school, level)=>{

        
        try {
          
          //ROUTE CAN BE MODIFIED TO 'http://localhost:4000/api/spells'
            const response = await fetch(`https://spellvault-api.vercel.app/api/spells/filter/&${playerClass}&${school}&${level}`)
      
            const spellData = await response.json()
            // console.log(spellData) //ARRAY OF SPELLS OBJECTS
            return spellData
          } catch (error) {
            console.error(error)
          }
      
    }

    return [fetchSpellAdvanced]

}