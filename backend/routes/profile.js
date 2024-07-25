import express from "express"
import { 
    addSpell, 
    createCharacter, 
    deleteCharacter, 
    deleteSpell, 
    editcharacter, 
    loadCharacter, 
    loadCharacterList, 
    prepareSpell,
    updateSlots
} from "../controllers/profileController.js"
import { requireAuth } from "../middleware/requireAuth.js"

export const router = express.Router()

//middleware
//All requests that use this routes must provide a valid authorization token in the headers, ex:
//headers: {
//    'Content-Type': 'application/json',
//    'Authorization': `Bearer ${token}`}
router.use(requireAuth)

//'/profile/createcharacter'

//POST
router.post('/createcharacter', createCharacter)

router.post('/loadcharacterlist', loadCharacterList) 

router.post('/loadcharacter', loadCharacter)

router.post('/editcharacter', editcharacter)

router.post('/addspell', addSpell)

router.post('/preparespell', prepareSpell)

router.post('/updateslots', updateSlots)



//DELETE
router.delete('/deletespell', deleteSpell)

router.delete('/deletecharacter', deleteCharacter)

