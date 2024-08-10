import express from "express";
import { getCustomSpells, createSpell} from "../controllers/customSpellsController.js";
import { requireAuth } from "../middleware/requireAuth.js";


export const router = express.Router()


router.get('/', getCustomSpells)

router.use(requireAuth)

// router.get('/:id', getSpell)

// router.get('/filter/&:playerclass?&:school?&:level?', getFilteredSpells)

router.post('/createspell', createSpell)


