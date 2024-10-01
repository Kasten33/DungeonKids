const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema({
    strength: {
        type: Number,
        required: true
    },
    dexterity: {
        type: Number,
        required: true
    },
    constitution: {
        type: Number,
        required: true
    },
    intelligence: {
        type: Number,
        required: true
    },
    wisdom: {
        type: Number,
        required: true
    },
    charisma: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Stats', statsSchema);