import {userModel} from '../models/userModel.js'
import jwt from 'jsonwebtoken';



//jwt token 
const createToken = (userId) => {
   return jwt.sign({_id: userId},process.env.JWT_SECRET, {expiresIn: '3d'})
}



//login user
export const loginUser = async (req, res)=>{

    const {email, password} = req.body
    try {
        //calls the static login method
        const user = await userModel.login(email, password)
        //creates token
        const token = createToken(user._id)
        //return user object
        res.status(200).json({email, token})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}



//signup user
export const signupUser = async (req, res)=>{

    //gets info from frontend
    const {email, password} = req.body;

    try {
        //calls the static signup method
        const user = await userModel.signup(email, password)
        //creates token
        const token = createToken(user._id)
        //return user object
        res.status(200).json({email, token})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    //res.json({mssg: 'signup user'})

}