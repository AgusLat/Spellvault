import mongoose, { Schema } from "mongoose";
import { spellSchema } from "./spellModel.js";

export const characterSchema = new Schema({
    user_id:{ 
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    charClass: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    stats: {
        //{STR: num, DEX: num, CON: num, CHA: num, WIS: num, INT: num}
        type: Map,
        of: Number,
        required: true
    },
    spellData: {
        slots: {
            type: Map,
            of: Number,
            required: true
        },
        availableSlots: {
            type: Map,
            of: Number,
            required: true
        },
        knownSpells: [spellSchema],
        preparedSpells: [spellSchema]
    },
    isActive: {
        type: Boolean,
        default: false
    }
})


export const characterModel = mongoose.model('character', characterSchema)

// You can use a Model to create new documents using `new`:
//const characterDoc = new characterModel({ 
//        user_id: 'sdaf6as6d7f8asdf678a87',
//        name: 'NombrePersonaje',
//        class: 'Wizard',
//        level: 5,
//        stats: {STR: num, DEX: num, CON: num, CHA: num, WIS: num, INT: num}
//});
//await characterDoc.save();

// You also use a model to create queries:
//const characterFromDb = await characterModel.findOne({ user_id: 'sdaf6as6d7f8asdf678a87' });
