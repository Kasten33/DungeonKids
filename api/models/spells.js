const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spellSchema = new Schema({}); //make this model

module.exports = mongoose.model("Spell", spellSchema);
