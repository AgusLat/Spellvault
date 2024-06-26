import jwt from 'jsonwebtoken';
import {userModel} from '../models/userModel.js'



export const requireAuth = async (req, res, next) =>{

    //verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const{_id} = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await userModel.findOne({_id}).select('_id') //VERIFICAR SI NO HAY ERRORES CON userModel
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}