import React, { useEffect, useState } from 'react'
import { useAdvancedSearch } from '../hooks/useAdvancedSearch'
import '../css/searchForms.css'
import '../css/loadingPage.css'

//COMPONENTS
import SpellList from './SpellList'
import { NoSearch } from './NoSearch'
import { Loading } from './Loading'


export const AdvancedSearchForm = ({spells, hasAdd}) => {

    const [noSearch, setNoSearch] = useState(false)
    const [playerClass, setPlayerClass] = useState('')
    const [school, setSchool] = useState('')
    const [level, setLevel] = useState('')
    const [spellResults, setSpellResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [noResults, setNoResults] = useState(false)


    const [fetchSpellAdvanced] = useAdvancedSearch()


    useEffect(() => {

        setNoSearch(true)

    },[])

    

    const handleClick = async(e)=>{
        e.preventDefault()
        setNoResults(false)
        setNoSearch(false)
        setLoading(true)
        const results = await fetchSpellAdvanced(playerClass, school, level)
        if(results.length === 0){
            setSpellResults(null)
            setNoResults(true)
            setLoading(false)
            return
        }
        setLoading(false)
        setSpellResults(results)
    }


    


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
            </div>
            <button type='submit' onClick={(e)=>handleClick(e)} className='quickSearch__btn'>SEARCH</button>
        </form>
    </div>

    {noSearch && <NoSearch/>}
    {loading?<Loading size={'--small'}/>:null}
    {spellResults && <SpellList hasAdd={hasAdd} spellData={spellResults}></SpellList>}
    {noResults && <p>No spells found</p>}

    
    </>
  )
}
