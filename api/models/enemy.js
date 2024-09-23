//later in the development process, 
//you can remove this comment and replace it with a more detailed description of the model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enemySchema = new Schema({}); //make this model

module.exports = mongoose.model('Enemy', enemySchema);