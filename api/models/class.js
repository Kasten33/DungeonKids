const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hitDie: {
        type: Number,
        required: true
    },
    primaryAbility: {
        type: String,
        required: true
    },
    savingThrow: {
        type: String,
        required: true
    },
    armor: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Class', classSchema);