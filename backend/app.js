import 'dotenv/config'
import cors from 'cors'
import express  from "express";
import {router as spellRoutes} from './routes/spells.js'
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


//ROUTES
app.use('/api/spells', spellRoutes)




 app.get('/', (req, res)=>{
     res.json({'mssg':'GET request to /'})
 })



connectDb()

app.listen(port, ()=>{
    console.log('Server listening on port', port)
})