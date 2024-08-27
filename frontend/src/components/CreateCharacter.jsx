import React, { useState } from 'react'
import '../css/createCharacter.css'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCreateCharacter } from '../hooks/useCreateCharacter'
import { useClassSlots } from '../hooks/useClassSlots'
import { useLoadCharList } from '../hooks/useLoadCharList'

export const CreateCharacter = () => {

  
  const {user} = useAuthContext()
  
  //HOOKS
  const { createCharacter, isLoading, createCharError } = useCreateCharacter()
  const { loadCharList, isLoadingList, loadListError } = useLoadCharList()
  const { initialSlots } = useClassSlots() 
 

  //STATES
  const [isSuccesful, setIsSuccesful] = useState(false)

  //FORM DATA STATES
  const [charName, setCharName] = useState(null)
  const [charClass, setCharClass] = useState(null)
  const [charLevel, setCharLevel] = useState(null)
  const [strStat, setStrStat] = useState(null)
  const [dexStat, setDexStat] = useState(null)
  const [conStat, setConStat] = useState(null)
  const [intStat, setIntStat] = useState(null)
  const [wisStat, setWisStat] = useState(null)
  const [chaStat, setChaStat] = useState(null)



  const handleSubmit = async(e)=>{
    e.preventDefault()

    setIsSuccesful(false)

    //ASSIGN INITAL SPELL SLOTS
    const spellSlots = initialSlots(charClass, charLevel)

    //token PARAMETER
    const token = user.token

    //newCharacter PARAMETER
    const newCharacter = {
      user_id: user._id,
      name: charName,
      charClass: charClass,
      level: parseInt(charLevel),
      stats: {
        STR: parseInt(strStat), 
        DEX: parseInt(dexStat), 
        CON: parseInt(conStat), 
        INT: parseInt(intStat) , 
        WIS: parseInt(wisStat), 
        CHA: parseInt(chaStat)
      },
      spellData: {
        slots:  spellSlots,
        availableSlots: spellSlots
      }
    }
    
   
    const succesful = await createCharacter(newCharacter, token)
    await loadCharList(user._id, user.token)
    succesful? setIsSuccesful(true): null
  }


  return (
    <div className='createChar'>
      <form className='createChar__form' onSubmit={handleSubmit}>
        <div className='createChar__name'>
          <h1>Name</h1> <input className='createChar__input' type='text' onChange={(e)=>{setCharName(e.target.value)}} required></input>
        </div>
        <div className='createChar__classLevel'>
          <label>
          Class <select className='createChar__input--sm' type='text' defaultValue={""} onChange={(e)=>{setCharClass(e.target.value)}} required>      
            <option value="">Non selected</option>
            <option value="artificer">Artificer</option>
            <option value="bard">Bard</option>
            <option value="cleric">Cleric</option>
            <option value="druid">Druid</option>
            <option value="monk">Monk</option>
            <option value="paladin">Paladin</option>
            <option value="ranger">Ranger</option>
            <option value="rogue">Rogue</option>
            <option value="sorcerer">Sorcerer</option>
            <option value="warlock">Warlock</option>
            <option value="warrior">Warrior</option>
            <option value="wizard">Wizard</option>
          </select>
            </label>
          <label> 
            Level <input className='createChar__input--sm' type='number' min="1" max="20" onChange={(e)=>{setCharLevel(e.target.value)}} required></ input>
          </label>
        </div>
        <div className='createChar__stats'>
          <div className='createChar__subStats'>
            <label>Strength <input className='createChar__input--sm' type='number' min="1" max="20" onChange={(e)=>{setStrStat(e.target.value)}} required></input></label>
            <label>Dexterity <input className='createChar__input--sm'  type='number' min="1" max="20" onChange={(e)=>{setDexStat(e.target.value)}} required></input></label>
            <label>Constitution <input className='createChar__input--sm' type='number' min="1" max="20" onChange={(e)=>{setConStat(e.target.value)}} required></input></label>
          </div>
          <div className='createChar__subStats'>
            <label>Intelligence <input className='createChar__input--sm' type='number' min="1" max="20" onChange={(e)=>{setIntStat(e.target.value)}} required></input></label>
            <label>Wisdom <input className='createChar__input--sm' type='number' min="1" max="20" onChange={(e)=>{setWisStat(e.target.value)}} required></input></label>
            <label>Charisma <input className='createChar__input--sm' type='number' min="1" max="20" onChange={(e)=>{setChaStat(e.target.value)}} required></input></label>
          </div>
        </div>
        <button
          className={'createChar__button' + (isLoading?' --createCharDisabled':'')}
          disabled={isLoading}>CREATE CHARACTER</button>
        {createCharError?<p>{createCharError}</p>:null}
        {isSuccesful?<div className='createChar__success'>Character created succesfully</div>:null}

      </form>
    </div>
  )
}
