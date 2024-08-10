import mongoose from 'mongoose'
import { Schema } from 'mongoose'

export const customSpellSchema = new Schema({
    user_id:{ 
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt:{ 
        type: Date,
        default: Date.now,
        required: true
    },
    user_likes:[String],
    name:{
        type: String,
        required: true},
    desc:{
        type: String,
        required: true},
    higher_level:{
        type: String,
        required: false},
    page:{
        type: String,
        default: 'Homebrew',
        required: false},
    range:{
        type: String,
        required: true},
    components:{
        type: String,
        required: true},
    material:{
            type: String,
            required: false},
    ritual:{
        type: Boolean,
        required: true},
    duration:{
        type: String,
        required: true},
    concentration:{
        type: Boolean,
        required: true},
    casting_time:{
        type: String,
        required: true},
    level:{
        type: String,
        required: true},
    school:{
        type: String,
        required: true},
    class:{
        type: String,
        required: true}
})


export const customSpellModel = mongoose.model('customSpell', customSpellSchema)
