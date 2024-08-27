import 'dotenv/config';
import express  from "express";
import cors from 'cors';
import cron from 'node-cron'
import { router as spellRoutes } from './routes/spells.js';
import { router as customSpellRoutes } from './routes/customSpells.js';
import { router as userRoutes } from './routes/users.js';
import { router as profileRoutes} from './routes/profile.js';
import { connectDb } from './connectDb.js';

const app = express()
const port = process.env.PORT


//MIDDLEWARES

//parses "req" to json
app.use(express.json())
//avoid cors errors
app.use(cors())
//logs user requests
app.use( (req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//PUBLIC FOLDER
app.use(express.static('public'));

//ROUTES
app.use('/api/spells', spellRoutes)

app.use('/api/customspells', customSpellRoutes)

app.use('/api/user', userRoutes)

app.use('/api/profile', profileRoutes)







 app.get('/', (req, res)=>{
     res.json({'mssg':'GET request to /'})
 })



connectDb()

app.listen(port, ()=>{
    console.log('Server listening on port', port)
})



cron.schedule('*/10 * * * *', async()=>{
   const response = await fetch('https://spellvault-api.onrender.com/')
   const json = await response.json()
   if(response.ok){
    console.log("Server running...")
   }
   if(!response.ok){
    console.log(json.error)
   }
})
