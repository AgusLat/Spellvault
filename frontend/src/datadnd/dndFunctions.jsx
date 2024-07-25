
//PROFICIENCY MODIFIER CALCULATOR BY LVL
export const calculateProficiency = (lvl)=>{
    if (lvl < 1 || lvl > 20) {
        throw new Error("Player level has to be between 1 and 20.");
    }

    if (lvl >= 1 && lvl <= 4) {
        return 2;
    } else if (lvl >= 5 && lvl <= 8) {
        return 3;
    } else if (lvl >= 9 && lvl <= 12) {
        return 4;
    } else if (lvl >= 13 && lvl <= 16) {
        return 5;
    } else if (lvl >= 17 && lvl <= 20) {
        return 6;
    } 
}

//ABILITY MODIFIER BY ATTRIBUTE
export const calculateModifier = (att)=>{
    if (att < 1 || att > 30) {
        throw new Error("The attribute must be between 1 and 30.");
    }
    return Math.floor((att - 10) / 2);
}

