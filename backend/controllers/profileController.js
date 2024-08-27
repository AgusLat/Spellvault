import {characterModel} from '../models/characterModel.js'
import { userModel } from '../models/userModel.js'
import { spellModel } from '../models/spellModel.js'
import { customSpellModel } from '../models/customSpellModel.js'
import mongoose, { Types } from 'mongoose'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';


//DEFINES PATH FOR DOWNLOAD
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




export const createCharacter = async (req, res) =>{

    const { user_id, name, charClass, level, stats, spellData } = req.body
    
    //Converts string to ObjectId type
    const objectId = new Types.ObjectId(user_id)

    const user = await userModel.findById(objectId)
    
    try {
      
          //VERIFICAR SI EL USUARIO QUE HIZO LA PETICION EXISTE if(usuario no existe){throw Error('Invalid user')}
        if(!user){
          throw Error('Invalid user')
        }
          //VERIFICAR SI TIENE MENOS DE 3 PERSONAJES: if(characters_id.length > 3){throw Error('Maximum amount of characters reached. Delete one character to create a new one.')}
        if(user.characters_id.length >= 3){
          throw Error('Maximum amount of characters reached. Delete one character to create a new one.')
        }
          //SI NO CUMPLE CUALQUIERA DE LAS 2 -> dar error y mostrarlo

        const newCharacter = await characterModel.create({
            user_id: objectId,
            name: name,
            charClass: charClass,
            level: level,
            stats: {
              STR: stats.STR, 
              DEX: stats.DEX, 
              CON: stats.CON, 
              INT: stats.INT, 
              WIS: stats.WIS, 
              CHA: stats.CHA
            },
            spellData:{
              slots: spellData.slots,
              availableSlots: spellData.availableSlots
            }
          })


        //ADDS CHARACTER ID TO THE USER characters_id
        await userModel.updateOne(
          {_id: objectId}, 
          { $push: { characters_id: {charId: newCharacter._id} }})
        //const primerChar = await characterModel.findById(user.characters_id[0].charId)
        //Returns new character document
        res.status(200).json(newCharacter)


    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



export const deleteCharacter = async (req, res)=>{

  const {charId, userId} = req.body 
  try {
    //GETS CHARACTER BY ID AND DELETES IT
    const deletedCharacter = await characterModel.findByIdAndDelete(charId)
    if(!deletedCharacter){
      throw Error('Character not found')
    }
    //GETS THE USER BY ID AND UPDATES THE CHARACTERS_ID PROPERTY
    const result = await userModel.updateOne(
      { _id: userId },
      { $pull: { characters_id:  {charId}  } }
    );

    res.status(200).json({message:"Character deleted succesfuly", result})
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}


export const loadCharacter = async (req, res) =>{

  const {charId, userId} = req.body

  try {

    await characterModel.updateMany(
      { user_id: userId, isActive: true, _id: { $ne: charId } },
      { $set: { isActive: false } }
    );

    const character = await characterModel.findByIdAndUpdate(charId, { $set: { isActive: true } },{ new: true })
    res.status(200).json(character)
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}

export const loadCharacterList = async (req, res) =>{

  const { _id } = req.body

  
  try {

    const user = await userModel.findById(_id)
  
    const characters_id = user.characters_id
    
    let json = {activeCharacter: null, characterList: []}

    for(const char of characters_id){
      let character = await characterModel.findById(char.charId)

      if(character.isActive){
        json.activeCharacter = character
      }

      json.characterList.push({_id:character._id, name: character.name})
    }

    
    res.status(200).json(json)


  } catch (error) {
    res.status(400).json({error: error.message})
  }

}


export const editcharacter = async(req, res)=>{

    const { charId, level, stats, slots } = req.body

    try {
      
      const json = await characterModel.findByIdAndUpdate( 
        charId, 
        {level: level, stats: stats, "spellData.slots": slots, "spellData.availableSlots": slots}, 
        { new: true } )

      res.status(200).json(json)

    } catch (error) {
      res.status(400).json({error:error.message})
    }
  

}





export const addSpell = async(req, res)=>{

  const {spellId, isCustom, charId} = req.body
  try {

    let spell
    
    if(isCustom){
      spell = await customSpellModel.findById( spellId )
    }

    if(!isCustom){
      spell = await spellModel.findById( spellId )
    }
    
    const character = await characterModel.findById( charId )


    const isSpellKnown = character.spellData.knownSpells.some(knownSpell => {
      const knownSpellId = knownSpell._id  
      return knownSpellId.toString() === spell._id.toString()
    })

    if (isSpellKnown) {
      return res.status(200).json({ isSpellKnown });
    }


    character.spellData.knownSpells.push(spell);
    await character.save();

    res.status(200).json({ isSpellKnown })
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}


export const prepareSpell = async (req, res)=>{
  const {spellId, isCustom, charId} = req.body

  try {
    let spell
    
    if(isCustom){
      spell = await customSpellModel.findById( spellId )
    }

    if(!isCustom){
      spell = await spellModel.findById( spellId )
    }

    const character = await characterModel.findById( charId )


    const isSpellPrepared = character.spellData.preparedSpells.some(preparedSpell => {
      const preparedSpellId = preparedSpell._id  
      return preparedSpellId.toString() === spell._id.toString()
    })

    if (isSpellPrepared) {
      return res.status(200).json({ isSpellPrepared });
    }


    character.spellData.preparedSpells.push(spell);
    await character.save();

    res.status(200).json({ isSpellPrepared })
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}






export const deleteSpell = async(req, res)=>{

  const {charId, spellId, path} = req.body

  const objectId = new Types.ObjectId(spellId)

  try {

    let character;

    if(path === 'knownSpells'){
        character = await characterModel.findByIdAndUpdate(charId,
        { $pull: { 
          'spellData.knownSpells': { _id: objectId },
          'spellData.preparedSpells': { _id: objectId } 
          } 
          }, 
        { new: true }
      );
    }

    if(path === 'preparedSpells'){
      character = await characterModel.findByIdAndUpdate(charId,
      { $pull: { 'spellData.preparedSpells': { _id: objectId } } }, 
      { new: true }
    );
  }

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.status(200).json(character)

  } catch (error) {
    res.status(400).json({error: error.message})
  }

}




export const updateSlots = async (req, res)=>{

  const {charId, slots} = req.body

  try {

    const json = await characterModel.findByIdAndUpdate( 
      charId, 
      {"spellData.availableSlots": slots}, 
      { new: true } )

    res.status(200).json(json)
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}




export const downloadFile = async (req, res)=>{
  const filename = req.params.filename;
  const filePath = path.join(__dirname,'..', 'public', filename)
  console.log(filePath)
  try {
    res.download(filePath, (err) => {
      if (err) {
        res.status(404).send('File not found')
      }
    })
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}