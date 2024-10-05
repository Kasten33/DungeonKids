const mongodb = require("../DB/connect");
const { ObjectId } = require("mongodb")

const getCharacter = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db()
        .collection("Characters")
        .findOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const getCharacters = async (req, res) => {
    try{
        const result = await mongodb
        .getDb()
        .db()
        .collection("Characters")
        .find()  
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const createCharacter = async (req, res) => {
    try{
        const character = req.body;
        const result = await mongodb
        .getDb()
        .db()
        .collection("Characters")
        .insertOne(character);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
};


const updateCharacter = async (req, res) => {
    try{
        const { id } = req.params;
        const character = req.body;
        const result = await mongodb
        .getDb()
        .db()
        .collection("Characters")
        .updateOne({ _id: ObjectId(id) }, { $set: character });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const deleteCharacter = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db()
        .collection("Characters")
        .deleteOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

//will add logic later

module.exports = {
    getCharacter,
    getCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    };