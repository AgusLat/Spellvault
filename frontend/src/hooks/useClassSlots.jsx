import React from 'react'
import { spellSlotsGeneral, 
        spellSlotsPaladin, 
        spellSlotsWarlock, 
        spellSlotsRanger, 
        spellSlotsArcaneTrickster, 
        spellSlotsEldritchKnight
    } from '../datadnd/dndClasses.jsx'




export const useClassSlots = () => {
  
    const initialSlots =(charClass, charLevel)=>{

        
        switch (charClass) {
            case 'paladin':
                return spellSlotsPaladin[charLevel]
                break;
            case 'warlock':
                return spellSlotsWarlock[charLevel]
                break;
            case 'ranger':
                return spellSlotsRanger[charLevel]
                break;
            case 'rogue':
                return spellSlotsArcaneTrickster[charLevel]
                break;
            case 'warrior':
                return spellSlotsEldritchKnight[charLevel]
                break;                    
            default:
                return spellSlotsGeneral[charLevel]
                break;
        }
                                
    }


    //FUNCION PARA EDITAR SLOTS

    return { initialSlots }
}
                            