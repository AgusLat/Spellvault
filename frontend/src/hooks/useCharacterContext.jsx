import { useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";

export const useCharacterContext = ()=>{
    const context = useContext(CharacterContext)

    if (!context) {
        throw Error('useCharacterContext must be used inside CharacterContextProvider')
    }

    return context
}