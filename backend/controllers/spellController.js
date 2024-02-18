import { spellModel } from "../models/spellModel.js";
import mongoose from "mongoose";


//GET all spells

export const getSpells = async ( req, res ) =>{
    try {
        //This will bring ALL DOCUMENTS
        const spells = await spellModel.find()
        res.status(200).json(spells)  
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



//GET spell by ID quick search
export const getSpell = async ( req, res ) =>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such spell'})
    }

    try {

        const spell = await spellModel.findById(id)
        res.status(200).json(spell)  
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



//GET filtered spells

export const getFilteredSpells = async (req, res)=>{

    const playerClass = req.params.playerclass
    const school = req.params.school
    const level = req.params.level

    let query = {}

    if(playerClass){  
        query.class = {"$regex": playerClass }
    }
    if(school){
        query.school = school
    }
    if(level){
        query.level = level 
    }
     
    try {

        const spells = await spellModel.find(query)
        res.status(200).json(spells)
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

    

}
