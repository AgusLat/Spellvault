import React from 'react'
import { useState, useEffect } from 'react'
import { useSpellSearch } from '../hooks/useSpellSearch'
import '../css/searchForms.css'

//COMPONENTS
import { SpellCard } from './SpellCard'
import { NoSearch } from './NoSearch'
import { Loading } from './Loading'





export const QuickSearchForm = ({spells, count}) => {

    const [ searchBarInput, setsearchBarInput ] = useState("")
    const [ spellCardData, setSpellCardData ]   = useState(null)
    const [ searchError, setSearchError ]       = useState(false)
    const [loading, setLoading]                 = useState(false)
    const [ noSearch, setNoSearch ]             = useState(false)
    const [ fetchSpell ]                        = useSpellSearch()


    useEffect(() => {
      
      setNoSearch(true)


    }, [])
    


    const handleSearch = async (spellName)=>{

      setLoading(true)

        const list = spells.map((item) => {
                      return ({
                        "id": item._id,
                        "name": item.name.toLowerCase()
                        })
                      })
    
        const filteredList = list.filter(item=>item.name.startsWith(spellName.toLowerCase()))
          
         if(filteredList.length === 0 || spellName === ''){
           setLoading(false)
           setsearchBarInput("")
           setSpellCardData(null)
           setNoSearch(false)
           setSearchError(true)
           console.log("NO SUCH SPELL")
           return
         }
         if(filteredList.length >= 1 ){
    
         const spellData = await fetchSpell(filteredList[0].id)
         setLoading(false)
         setNoSearch(false)
         setSearchError(false)
         setsearchBarInput("")
         setSpellCardData(spellData)
      }
      }



  return (
    <>
    <div className='quickSearch'>
   
      <h3>Amount of spells in the vault: {count}</h3>

      <form className='quickSearch__form' onSubmit={(e)=>e.preventDefault()}>
        <input className='quickSearch__input' onChange={(e)=>setsearchBarInput(e.target.value)} value={searchBarInput} type="search" />
        <button className='quickSearch__btn' onClick={()=>handleSearch(searchBarInput)}>SEARCH</button>
      </form>

      <ul className='quickSearch__dropdown-ul'>
        {spells
          .filter((item)=>{
              const searchInput = searchBarInput.toLowerCase()
              const spellName = item.name.toLowerCase()
              return searchInput && spellName.startsWith(searchInput)             
          })
          .slice(0,10)
          .map(spell=> 
            <li onClick={()=>handleSearch(spell.name)} className='quickSearch__dropdown-li' key={spell._id}>
              {spell.name}
            </li>
            )
          }
      </ul>

      <div className='spellCard-container'>
        {loading?<Loading></Loading>:null}
        {searchError && <div className='spellCard-container__no-matches'><h3>No coincidences</h3></div>}
        {spellCardData && <SpellCard key={spellCardData._id} spellId={spellCardData._id} spellData={spellCardData}></SpellCard> }
      </div>

    </div>
    { noSearch && <NoSearch></NoSearch>}

    </>
  )
}
