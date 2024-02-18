

export const useAdvancedSearch = (playerClass, school, level)=>{


    const fetchSpellAdvanced = async (playerClass, school, level)=>{

        
        try {
            const response = await fetch(`http://localhost:4000/api/spells/filter/&${playerClass}&${school}&${level}`)
      
            const spellData = await response.json()
            console.log(spellData) //ARRAY OF SPELLS OBJECTS
            return spellData
          } catch (error) {
            console.error(error)
          }
      
    }

    return [fetchSpellAdvanced]

}