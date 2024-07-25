import { createContext, useReducer, useEffect } from "react";
import { useLoadCharList } from "../hooks/useLoadCharList";


// characterContext = {
//    characterList:[ Personaje, Personaje, Personaje]
//    activeCharacter: {
//        personaje con isActive en TRUE
//    }

export const CharacterContext = createContext()

//LOAD : Al hacer click en un personaje, isActive pasa a true, se cargan en el state sus hechizos y slots (preparados y usados tambien)
//UPDATE: Todas las modificaciones hechas en un combate o modificacion se guardan en la BBDD para que el proximo LOAD tenga la info correcta
//RESET: Resetea los slots usados, 

export const characterReducer = (state, action) => {
    switch(action.type){
        case 'LOAD-LIST':
            return { ...action.payload };
        case 'SET-ACTIVE':
            return { characterList:[ ...state.characterList],
                    activeCharacter: {...action.payload} 
                };
        case 'ADD':
            return { characterList:[ ...state.characterList, action.payload],
                     activeCharacter: state.activeCharacter
                };
        case 'CAST-SPELL':
            return { characterList:[ ...state.characterList],
                    activeCharacter: {...action.payload} 
                };
        case 'RESET-SLOTS':
            return { characterList:[ ...state.characterList],
                    activeCharacter: action.payload 
                };
            
        default:
            return state
    }
}


export const CharacterContextProvider = ( {children} )=> {  //{children} represents all the components that AuthContextProvider wraps

    const [state, dispatch] = useReducer(characterReducer, { characterList:[], activeCharacter: null })

    useEffect(() => {
        // console.log('Character context : ', state);
      }, [state]);


return (
        <CharacterContext.Provider value ={{state, dispatch}}>
            {children}
        </CharacterContext.Provider>

)
}