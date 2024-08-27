import { spellModel } from "../models/spellModel.js";
import {customSpellModel} from "../models/customSpellModel.js"
import {userModel} from "../models/userModel.js"
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

    const { playerClass, school, level, custom, page, sortBy} = req.query

    const isCustom = custom === 'false'? false :true
    const pageNumber = parseInt(page, 10) || 1;
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // 'asc' OR 'desc'
    

    let query = {} //BUILDS FILTER QUERY

    if(playerClass){  
        query.class = { "$regex": new RegExp(playerClass, 'i')}
    }
    if(school){
        query.school = school
    }
    if(level){
        query.level = level 
    }

    let sortField = {} //BUILDS RESULT ORDER

    if (sortBy === 'name') {
        sortField.name = sortOrder
    } 
    if (sortBy === 'user_likes') {
        sortField.user_likes = sortOrder
    }
    if (sortBy === 'createdAt') {
        sortField.createdAt = sortOrder
    }

    
     
    try {

        if(!isCustom){

            const totalSpells = await spellModel.countDocuments(query)
            const totalPages = Math.ceil((totalSpells / 10))

            const spells = await spellModel
                .find(query)
                .sort(sortField)
                .skip((pageNumber - 1) * 10)
                .limit(10)

            res.status(200).json({spells,totalPages})
        }

        if(isCustom){

            if(mongoose.isValidObjectId(sortBy)){
               query.user_likes = { $in: [sortBy] };
            }

            const totalSpells = await customSpellModel.countDocuments(query)

            const spells = await customSpellModel
                .find(query)
                .sort(sortField)
                .skip((pageNumber - 1) * 10) 
                .limit(10)
            
            res.status(200).json({spells, totalSpells})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

    

}


export const likeSpell = async (req, res)=>{

    const {userId, spellId} = req.body


    try {
   
        const user = await userModel.findById(userId)
        const spell = await customSpellModel.findById(spellId)
        const index = spell.user_likes.indexOf(userId)
     
        if(index > -1){
            spell.user_likes.splice(index, 1);
        }
        if(index === -1){
            spell.user_likes.push(userId);
        }
        await spell.save();
        res.status(200).json(spell.user_likes)
      
    } catch (error) {
        res.status(400).json({error: error.message})
    }


}