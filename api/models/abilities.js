const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const abilitySchema = new Schema({
    racial: {   
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    feats: {   
        type: String,
        required: true
    },
});

mongoose.model('Ability', abilitySchema);