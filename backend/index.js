import 'dotenv/config';
import cors from 'cors';
import express  from "express";
import { router as spellRoutes } from './routes/spells.js';
import { router as userRoutes } from './routes/users.js';
import {router as profileRoutes} from './routes/profile.js';
import { connectDb } from './connectDb.js';

const app = express()
const port = process.env.PORT


//MIDDLEWARES

//parses "req" to json
app.use(express.json())
//avoid cors errors
app.use(cors({
     origin: 'https://spellvault-lovat.vercel.app'
}))
//logs user requests
app.use( (req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//ROUTES
app.use('/api/spells', spellRoutes)

app.use('/api/user', userRoutes)

app.use('/api/profile', profileRoutes)




 app.get('/', (req, res)=>{
     res.json({'mssg':'GET request to /'})
 })



connectDb()

app.listen(port, ()=>{
    console.log('Server listening on port', port)
})