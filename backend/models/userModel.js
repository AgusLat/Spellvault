import mongoose from "mongoose";
import {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});


//Static methods
userSchema.statics.signup = async function (email, password) {

    //validation
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }

    //checks if the email is already in use 
    const exists = await this.findOne({email})
    if (exists){
        throw Error("Email already in use")
    }
    //generates hash from password + salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //adds the data to the db
    const user = await this.create({email, password: hash})

    //returns the user object
    return user
}



userSchema.statics.login = async function(email, password){

    //validation
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    //checks user exists in db
    const user = await this.findOne({email})
    if (!user){
        throw Error("Incorrect email")
    }

    //checks pswd comparing with hashed on db
    const match = await bcrypt.compare(password, user.password)
    if (!match){
        throw Error("Incorrect password")
    }

    return user
}

export const userModel = mongoose.model('user', userSchema);