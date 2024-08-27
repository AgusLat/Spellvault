import React, { useEffect, useState } from 'react'
import { useAdvancedSearch } from '../hooks/useAdvancedSearch'
import '../css/searchForms.css'
import '../css/loadingPage.css'

//COMPONENTS
import SpellList from './SpellList'
import { NoSearch } from './NoSearch'
import { Loading } from './Loading'
import { useAuthContext } from '../hooks/useAuthContext'


export const AdvancedSearchForm = ({spells, searchCustoms, hasAdd, hasLike, hasOrder, hasCustom}) => {

    const [noSearch, setNoSearch]                 = useState(true)
    const [spellResults, setSpellResults]         = useState([])
    const [totalPages, setTotalPages]             = useState(0)
    const [noResults, setNoResults]               = useState(false)
    const [isPressed, setIsPressed]               = useState(false)
    const [isPrevPressed, setIsPrevPressed]       = useState(false)
    const [isNextPressed, setIsNextPressed]       = useState(false)

    //QUERY STATES
    const [playerClass, setPlayerClass]           = useState('')
    const [school, setSchool]                     = useState('')
    const [level, setLevel]                       = useState('')
    const [isCustom, setIsCustom]                 = useState(searchCustoms? searchCustoms: false)
    const [sortBy, setSortBy]                     = useState({type:'name', order: 'asc'})//'name', 'user_likes', 'createdAt', user._id || 'asc', 'desc'
    const [currentPage, setCurrentPage]           = useState(1)

    
    //CONTEXT
    const {user} = useAuthContext()
    //HOOKS
    const {fetchSpellAdvanced, fetchError, fetchLoading} = useAdvancedSearch()


    //USE-EFFECTS
    useEffect(() => {
        setNoSearch(true)
    },[])

    useEffect(() => {
         if(!noSearch){
             handleSearch();
             setNoSearch(true)
         }
    }, [currentPage, noSearch]);


    //FETCH HANDLER

    const handleSearch = async()=>{

        if(!isCustom){
            setSortBy({type:'name', order: 'asc'})
        }

        setNoResults(false)
        let queryParams = {
            ...(playerClass) && {playerClass: playerClass},
            ...(school) && {school: school},
            ...(level) && {level: level},
            custom: isCustom.toString(),
            sortBy: sortBy.type,
            sortOrder: sortBy.order,
            page: currentPage.toString()
        }

        const {spells, totalPages} = await fetchSpellAdvanced(queryParams)
        
        if(spells.length === 0){
            setSpellResults(null)
            setNoResults(true)
            setTotalPages(0)

            return
        }
        setSpellResults(spells)
        setTotalPages(totalPages)
    }



    //PAGINATION HANDLER

    const handleSubmit = (e)=>{
      e.preventDefault()
      setCurrentPage(1)
      setNoSearch(false)
    }

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage- 1);
        setNoSearch(false)
      }
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        setNoSearch(false)
      }
    };

      
    

  return (
    <>
    <div className='advancedSearch'>
        <form className='advancedSearch__form' name='advancedSearch'>
            <div className='advancedSearch__options'>

            <div>
                <label>Class</label>
                <select value={playerClass} onChange={(e)=>setPlayerClass(e.target.value)} className='advanced-selector' name="playerClass-select">
                    <option value="">Any</option>
                    <option value="Artificer" disabled>Artificer</option>
                    <option value="Bard">Bard</option>
                    <option value="Cleric">Cleric</option>
                    <option value="Druid">Druid</option>
                    <option value="Paladin">Paladin</option>
                    <option value="Ranger" >Ranger</option>
                    <option value="Ritual Caster">Ritual caster</option>
                    <option value="Sorcerer">Sorcerer</option>
                    <option value="Warlock">Warlock</option>
                    <option value="Wizard">Wizard</option>
                </select>
            </div>
            <div>
                <label>School</label>
                <select value={school} onChange={(e)=>setSchool(e.target.value)} className='advanced-selector' name="school-select">
                    <option value="">Any</option>
                    <option value="Abjuration">Abjuration</option>
                    <option value="Conjuration">Conjuration</option>
                    <option value="Divination">Divination</option>
                    <option value="Enchantment">Enchantment</option>
                    <option value="Evocation">Evocation</option>
                    <option value="Illusion">Illusion</option>
                    <option value="Necromancy">Necromancy</option>
                    <option value="Transmutation">Transmutation</option>
                </select>
            </div>
            <div>
                <label>Level</label>
                <select value={level} onChange={(e)=>setLevel(e.target.value)} className='advanced-selector' name="levelSelect">
                    <option value="">Any</option>
                    <option value="Cantrip">Cantrip</option>
                    <option value="1st-level">1st Level</option>
                    <option value="2nd-level">2nd Level</option>
                    <option value="3rd-level">3rd Level</option>
                    <option value="4th-level">4th Level</option>
                    <option value="5th-level">5th Level</option>
                    <option value="6th-level">6th Level</option>
                    <option value="7th-level">7th Level</option>
                    <option value="8th-level">8th Level</option>
                    <option value="9th-level">9th Level</option>
                </select>
            </div>
            { hasOrder && <div>
                <label>Sort by</label>
                <select 
                    value={JSON.stringify(sortBy)} 
                    onChange={(e)=>setSortBy(JSON.parse(e.target.value))} 
                    className='advanced-selector'
                >
                    <option value={JSON.stringify({type:'name', order: 'asc'})}>Name</option>
                    <option disabled={!isCustom}  value={JSON.stringify({type:'createdAt', order: 'desc'})}>Latest</option>
                    <option disabled={!isCustom}  value={JSON.stringify({type:'createdAt', order: 'asc'})}>Oldest</option>
                    <option disabled={!isCustom}  value={JSON.stringify({type:'user_likes', order: 'desc'})}>Most popular</option>
                    {user  && <option disabled={!isCustom} value={JSON.stringify({type: user._id, order: 'desc'})}>Favorites</option>}
                </select>
            </div>}
            { hasCustom && <div>
                <label>Source</label>
                <select 
                    value={isCustom} 
                    onChange={(e)=>{
                        setIsCustom(e.target.value=== 'false'? false: true)
                        e.target.value === 'false'? setSortBy({type:'name', order: 'asc'}): null
                    }} 
                    className='advanced-selector' name="levelSelect">
                    <option value='false' >Official</option>
                    <option value='true' >Homebrew</option>
                </select>
            </div>}
            <button 
                type='submit' 
                className={'quickSearch__btn'  + (isPressed? ' --searchPressed': '')}
                onTouchStart={()=>{setIsPressed(true)}}
                onTouchEnd={()=>{setIsPressed(false)}}
                onMouseDown={()=>{setIsPressed(true)}}
                onMouseUp={()=>{setIsPressed(false)}}
                onClick={(e)=>handleSubmit(e)} 
                >
                    SEARCH
            </button>
            </div>
            
           
        </form>
        <span className='quickSearch__help'>
          *Ritual, Concentration, Homebrew
          <b className='spellCard__ritualConcentration'>R</b>
          <b className='spellCard__ritualConcentration'>C</b>
          <b className='spellCard__ritualConcentration'>HB</b>

      </span>  
    </div>

    <div className={noResults || spellResults?.length < 10?'advancedSearch__resultsDiv':'advancedSearch__resultsDiv--long'}>
        {noResults && <NoSearch/>}
        {fetchError && <p>{fetchError}</p>}
        {fetchLoading?<Loading size={''}/>:null}
        {(spellResults && !fetchLoading) && <SpellList hasAdd={hasAdd} hasLike={hasLike} spellData={spellResults}></SpellList>}
    </div>

    <div className='advancedSearch__pagesDiv'>
        {(totalPages > 0) && 
        <>
            <div className='advancedSearch__pageCountDiv'>
                <button 
                    className={'advancedSearch__pageControls' + (isPrevPressed? ' --searchPressed': '')}
                    onTouchStart={()=>{setIsPrevPressed(true)}}
                    onTouchEnd={()=>{setIsPrevPressed(false)}}
                    onMouseDown={()=>{setIsPrevPressed(true)}}
                    onMouseUp={()=>{setIsPrevPressed(false)}}
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}>
                   <img src="/double-arrow-left.svg" alt="previous" />
                </button>
                <p> Page {currentPage} of {totalPages}</p>
                <button 
                    className={'advancedSearch__pageControls' + (isNextPressed? ' --searchPressed': '')}
                    onTouchStart={()=>{setIsNextPressed(true)}}
                    onTouchEnd={()=>{setIsNextPressed(false)}}
                    onMouseDown={()=>{setIsNextPressed(true)}}
                    onMouseUp={()=>{setIsNextPressed(false)}}
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}>
                    <img src="/double-arrow-right.svg" alt="next" />
                </button>
            </div>
        </>
        }
    </div>
    
    </>
  )
}
