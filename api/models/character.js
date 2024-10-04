// Description: Model for character
const { Stats } = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    class:{},//object?
    race:{
        type: String,
        required: true
    },
    background:{
        type: String,
        required: false
    },
    alignment:{
        type: String,
        required: true
    },
    experience:{
        type: Number,
        required: true
    },
    level:{
        type: Number,
        required: true
    },
    health:{
        type: Number,
        required: true
    },
    armorClass:{
        type: Number,
        required: true
    },
    stats:{
        type: Object,
        required: true
    },
    description:{}, //object
    traits:{}, //object
    spells:{}, //object
    weapons: {}, //object
    users:{}, //object | reference to user
    skills:{}, //object
    abilities:{}, //object

});


   mongoose.model('Character', characterSchema); //dont change this line ...model('name_of_model', schema_name)