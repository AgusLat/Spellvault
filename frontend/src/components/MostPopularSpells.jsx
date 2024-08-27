import React, {useEffect, useState} from 'react'

//CSS
import '../css/mostPopular.css'

//HOOKS
import { useAdvancedSearch } from '../hooks/useAdvancedSearch'

//COMPONENTS
import { Loading } from './Loading'
import { SpellCard } from './SpellCard'
import { MySwiper } from './MySwiper'





export const MostPopularSpells = () => {

    const [spellResults, setSpellResults] = useState(null)
    const {fetchSpellAdvanced, fetchLoading, fetchError} = useAdvancedSearch()


  
    useEffect(() => {
  
      async function fetchPopular(){
  
        let queryParams = {
          custom: true,
          sortBy: 'user_likes',
          sortOrder: 'desc',
          page: 1
      }
    
        const {spells} = await fetchSpellAdvanced(queryParams)
        setSpellResults(spells.slice(0,5))
  
      }
  
      fetchPopular()
      
    
      
    }, [])
    


  return (
    <>
        {fetchLoading && <Loading size='--small'/>}
        {spellResults&& <MySwiper spellResults ={spellResults}/>
        }
    </>
  )
}
