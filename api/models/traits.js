const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traitSchema = new Schema({
    personality: {
        type: String,
        required: false
    },
    ideals: {
        type: String,
        required: false
    },
    bonds: {
        type: String,
        required: false
    },
    flaws: {
        type: String,
        required: false
    },
});

mongoose.model('Trait', traitSchema);