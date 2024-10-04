const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

// Define the Description Schema

const DescriptionSchema = new Schema({
    hair:{
        type: String,
        required: false
    },
    eyes:{
        type: String,
        required: false
    },
    skin:{
        type: String,
        required: false
    },
    height:{
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    age:{
        type: Number,
        required: false
    },
});

mongoose.model('Description', DescriptionSchema);