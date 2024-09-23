const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({}); //make this model

module.exports = mongoose.model('Item', itemSchema);