import express from "express";
import { getFilteredSpells, getSpell, getSpells} from "../controllers/spellController.js";


export const router = express.Router()


router.get('/', getSpells)

router.get('/:id', getSpell)

router.get('/filter/&:playerclass?&:school?&:level?', getFilteredSpells)

