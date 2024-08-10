import mongoose, { Types } from "mongoose";
import { customSpellModel } from "../models/customSpellModel.js";
import { userModel } from "../models/userModel.js";



//GET all customspells

export const getCustomSpells = async ( req, res ) =>{
    try {
        //This will bring ALL DOCUMENTS
        const spells = await customSpellModel.find()
        res.status(200).json({spells})  
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}





//CREATE CUSTOM SPELL
    
export const createSpell = async (req, res)=>{

    const customSpell = req.body

    const objectId = new Types.ObjectId(customSpell.user_id) 

    const user = await userModel.findById(objectId)

    try {

        if(!user){
            throw Error('Invalid user')
        }

        const newSpell = customSpellModel.create({
            
             user_id:objectId,
             name:customSpell.name,
             desc:customSpell.desc,
             higher_level:customSpell.higher_level,
             page:customSpell.page,
             range:customSpell.range,
             components:customSpell.components,
             material: customSpell.material,
             ritual:customSpell.ritual,
             duration:customSpell.duration,
             concentration:customSpell.concentration,
             casting_time:customSpell.casting_time,
             level:customSpell.level,
             school:customSpell.school,
             class: customSpell.class
        })

        //ADDS CUSTOM SPELL ID TO THE USER custom_spells
        await userModel.updateOne(
            {_id: objectId}, 
            { $push: { customSpells: {customSpell_id: newSpell._id} }})
        
        res.status(200).json(newSpell)

        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }


}