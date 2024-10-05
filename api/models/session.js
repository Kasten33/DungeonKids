const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    characters: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Session', sessionSchema);