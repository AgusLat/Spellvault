import React, { useState } from 'react'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { Loading } from './Loading'
import { useAuthContext } from '../hooks/useAuthContext'
import { useUpdateSlots } from '../hooks/useUpdateSlots'

export const SlotControl = () => {

  //CONTEXT STATE
  const { state, dispatch } = useCharacterContext()  
  const { user } = useAuthContext()

  //HOOKS
  const {updateSlots, updateSlotLoading, updateSlotError} = useUpdateSlots()

  //USE STATE
  const [slotLevel, setSlotLevel] = useState('1st')
  const [slotAmount, setSlotAmount] = useState(0)
  const [isSetPressed, setIsSetPressed ] = useState(false)
  const [isResetPressed, setIsResetPressed ] = useState(false)




  const handleClick= async(action)=>{
      
    const token = user.token
    const charId = state.activeCharacter._id
    const prevState = state.activeCharacter

    if(action === 'reset'){

        let defaultSlots = { ...state.activeCharacter.spellData.slots }
        let payload = {...prevState, spellData: {...prevState.spellData, availableSlots: defaultSlots}}

   
        await updateSlots(charId, defaultSlots,token)
        dispatch({type:'RESET-SLOTS', payload: payload})

    }

    if(action === 'restore'){

        let availableSlots = { ...state.activeCharacter.spellData.availableSlots }
        availableSlots[slotLevel] = slotAmount
        const updatedCharacter = {...state.activeCharacter, spellData: {...state.activeCharacter.spellData, availableSlots: availableSlots}}

        await updateSlots(charId, availableSlots, token)
        dispatch({type: 'CAST-SPELL', payload: updatedCharacter})
    }

  }



  return (
    <div className='slotControl'>
        
        { state.activeCharacter != null
        ? 
        <table className='slotControl__table'>
            <thead>
                <tr>
                    {Object.keys(state.activeCharacter.spellData.availableSlots).map((key)=>{
                        return <td key={key}>{key}</td>
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {Object.values(state.activeCharacter.spellData.availableSlots).map((value, i)=>{
                       return <td key={i}>{value}</td>
                    })}
                </tr>
            </tbody>
        </table>
        :
        <Loading/>}

        <div className='slotControl__controllers'>
            
            <div className='slotControl__restore'>
                <select className='slotControl__select' defaultValue={slotLevel} onChange={(e)=>{setSlotLevel(e.target.value)}}>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                </select>
                <div className='slotControl__amountDiv'>
                    <button 
                        className='slotControl__controlBtn' 
                        disabled={slotAmount <= 0? true: false} 
                        onClick={()=>{setSlotAmount(slotAmount - 1)}}
                    > - </button>
                    {slotAmount}
                    <button 
                        className='slotControl__controlBtn' 
                        disabled={slotAmount >= 99? true: false} 
                        onClick={()=>{setSlotAmount(slotAmount + 1)}}
                    > + </button>
                </div>
                <button 
                    disabled={updateSlotLoading} 
                    className={'slotControl__restoreBtn' + (isSetPressed? ' --setPressed': '')}
                    onTouchStart={()=>{setIsSetPressed(true)}}
                    onTouchEnd={()=>{setIsSetPressed(false)}}
                    onMouseDown={()=>{setIsSetPressed(true)}}
                    onMouseUp={()=>{setIsSetPressed(false)}}
                    onClick={()=>{handleClick('restore')}}>
                    SET
                </button>
            </div>
            <button 
                disabled={updateSlotLoading} 
                className={'slotControl__btn'  + (isResetPressed? ' --resetPressed': '')}
                onTouchStart={()=>{setIsResetPressed(true)}}
                onTouchEnd={()=>{setIsResetPressed(false)}}
                onMouseDown={()=>{setIsResetPressed(true)}}
                onMouseUp={()=>{setIsResetPressed(false)}}
                onClick={()=>{handleClick('reset')}}>
                RESET
            </button>
        </div>
    </div>
)
}
