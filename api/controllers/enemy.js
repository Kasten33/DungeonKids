const { get } = require("http");
const mongodb = require("../DB/connect");
const { ObjectId } = require("mongodb")

const getEnemy = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db()
        .collection("Enemies")
        .findOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const getEnemies = async (req, res) => {
    try{
        const result = await mongodb
        .getDb()
        .db()
        .collection("Enemies")
        .find()  
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const createEnemy = async (req, res) => {
    try{
        const enemy = req.body;
        const result = await mongodb
        .getDb()
        .db()
        .collection("Enemies")
        .insertOne(enemy);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
};


const updateEnemy = async (req, res) => {
    try{
        const { id } = req.params;
        const enemy = req.body;
        const result = await mongodb
        .getDb()
        .db()
        .collection("Enemies")
        .updateOne({ _id: ObjectId(id) }, { $set: enemy });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const deleteEnemy = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db()
        .collection("Enemies")
        .deleteOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

//will add logic later

module.exports = {
    getEnemy,
    getEnemies,
    createEnemy,
    updateEnemy,
    deleteEnemy,
    };