const mongodb = require("../DB/connect");
const { ObjectId } = require("mongodb")

const getWeapon = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Weapons")
        .findOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const getWeapons = async (req, res) => {
    try{
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Weapons")
        .find()  
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const createWeapon = async (req, res) => {
    try{
        const weapon = req.body;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Weapons")
        .insertOne(weapon);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
};


const updateWeapon = async (req, res) => {
    try{
        const { id } = req.params;
        const weapon = req.body;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Weapons")
        .updateOne({ _id: ObjectId(id) }, { $set: weapon });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const deleteWeapon = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Weapons")
        .deleteOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getWeapon,
    getWeapons,
    createWeapon,
    updateWeapon,
    deleteWeapon,
    };