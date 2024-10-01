const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enemySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    alignment:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    challenge:{
        type: String,
        required: true
    },
    armorClass:{
        type: String,
        required: true
    },
    health:{
        type: String,
        required: true
    },
    speed:{
        type: String,
        required: true
    },
    stats:{
        type: Object,
        required: true
    },
    spell:{
        type: String,
        required: true
    },
    abilities:{
        type: String,
        required: true
    },
}); 

module.exports = mongoose.model('Enemy', enemySchema);