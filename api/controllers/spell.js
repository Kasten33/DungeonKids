const mongodb = require("../DB/connect");
const { ObjectId } = require("mongodb")

const getSpell = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Spells")
        .findOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const getSpells = async (req, res) => {
    try{
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Spells")
        .find()  
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const createSpell = async (req, res) => {
    try{
        const spell = req.body;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Spells")
        .insertOne(spell);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
};


const updateSpell = async (req, res) => {
    try{
        const { id } = req.params;
        const spell = req.body;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Spells")
        .updateOne({ _id: ObjectId(id) }, { $set: spell });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const deleteSpell = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Spells")
        .deleteOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

//will add logic later

module.exports = {
    getSpell,
    getSpells,
    createSpell,
    updateSpell,
    deleteSpell,
    };