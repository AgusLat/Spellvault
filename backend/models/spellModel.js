import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const spellSchema = new Schema({
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
        required: true},
    range:{
        type: String,
        required: true},
    components:{
        type: String,
        required: true},
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


export const spellModel = mongoose.model('spell', spellSchema)
