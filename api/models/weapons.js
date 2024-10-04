const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weaponSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    dmg: {
        type: Number,
        required: true
    },
    type: { 
        type: String,
        required: true
    },
    range: {
        type: Number,
        required: true
    },
}); 

module.exports = mongoose.model('Weapon', weaponSchema);