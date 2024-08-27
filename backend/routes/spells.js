import express from "express";
import { getFilteredSpells, getSpell, getSpells, likeSpell} from "../controllers/spellController.js";
import { requireAuth } from "../middleware/requireAuth.js";


export const router = express.Router()

//GET
router.get('/', getSpells)

router.get('/filter', getFilteredSpells)

router.get('/:id', getSpell)



//POST
router.use(requireAuth)

router.post('/like', likeSpell)

