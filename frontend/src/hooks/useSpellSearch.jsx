

export const useSpellSearch = (spellId)=>{
    
    
    const fetchSpell = async (spellId)=>{

        if(!spellId){
            return 
        }

        try {
            const response = await fetch(`http://localhost:4000/api/spells/${spellId}`)
      
            const spellData = await response.json()
            console.log(spellData) //SINGLE SPELL OBJECT
            return spellData
          } catch (error) {
            console.error(error)
          }
      
    }

    

    return [fetchSpell] 


}