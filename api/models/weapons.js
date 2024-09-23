const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weaponSchema = new Schema({}); //make this model

module.exports = mongoose.model('Weapon', weaponSchema);