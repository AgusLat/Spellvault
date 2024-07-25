import React, {useState, useEffect} from 'react'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { Loading } from './Loading'
import { useUpdateSlots } from '../hooks/useUpdateSlots'
import { useAuthContext } from '../hooks/useAuthContext'

export const CastControl = ({spellData}) => {

  //CONTEXT HOOKS
  const { user } = useAuthContext()
  const { state, dispatch } = useCharacterContext()
  //HOOKS
  const {updateSlots, updateSlotLoading, updateSlotError} = useUpdateSlots()

  //USE-STATES
  const [ slot, setSlot ] = useState('cantrip')
  const [ isPressed, setIsPressed ] = useState(false)


  const levelOptions = ['1st-level', '2nd-level', '3rd-level', '4th-level', '5th-level', '6th-level', '7th-level', '8th-level', '9th-level'];


  const handleSlotChange = (e) => {
    setSlot(e.target.value);
  }

  const handleClick = async () =>{

    if(slot === 'cantrip'){
      setIsPressed(true)
      setTimeout(() => {
        setIsPressed(false)
      }, 3000);
      return
    }
    
    if(state.activeCharacter.spellData.availableSlots[slot] != 0){
      setIsPressed(true)
      setTimeout(() => {
        setIsPressed(false)
      }, 3000);

      const charId = state.activeCharacter._id
      const token = user.token
      let availableSlots = { ...state.activeCharacter.spellData.availableSlots }

      availableSlots[slot] --
      await updateSlots(charId, availableSlots, token)
      
      const updatedCharacter = {...state.activeCharacter,spellData: {...state.activeCharacter.spellData,availableSlots: availableSlots}}
      dispatch({type: 'CAST-SPELL', payload: updatedCharacter})
     }
   }

  

  return (
    
    <div className='spellCard__castControls'>
      <button className='spellCard__castBtn'  disabled={updateSlotLoading} onClick={()=>{handleClick()}} >
        <img 
          disabled={updateSlotLoading} 
          onClick={()=>{handleClick()}} 
          className={'spellCard__cast-icon' + (isPressed?' --rainbow':'')} 
          src='/lightning.svg'></img>
      </button>
      <select className='spellCard__selectSlot' onChange={handleSlotChange} defaultValue={'cantrip'}>
        <option value={'cantrip'} >
          Cantrip
        </option>
        {state.activeCharacter &&
          (levelOptions
            .filter((lvl) => levelOptions.indexOf(lvl) >= levelOptions.indexOf(spellData.level))
            .map((lvl) => (

              //REMOVER CANTRIPS
              <option key={lvl.slice(0, lvl.indexOf('-'))} value={lvl.slice(0, lvl.indexOf('-'))}>
                {lvl.slice(0, lvl.indexOf('-'))}
              </option>
          )))
        }
      </select>
       
    </div>
  )
}
