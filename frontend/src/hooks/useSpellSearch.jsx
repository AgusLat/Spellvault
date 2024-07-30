

export const useSpellSearch = (spellId)=>{
    
    
    const fetchSpell = async (spellId)=>{

        if(!spellId){
            return 
        }

        try {
            //ROUTE CAN BE MODIFIED TO 'http://localhost:4000/api/spells'
            const response = await fetch(`https://spellvault-api.onrender.com/api/spells/${spellId}`)
      
            const spellData = await response.json()
            console.log(spellData) //SINGLE SPELL OBJECT
            return spellData
          } catch (error) {
            console.error(error)
          }
      
    }

    

    return [fetchSpell] 


}