import express from "express"
import { profileAccess } from "../controllers/profileController.js"
import { requireAuth } from "../middleware/requireauth.js"

export const router = express.Router()

//middleware
router.use(requireAuth)


router.get('/iduser', profileAccess)