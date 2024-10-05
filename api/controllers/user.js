const mongodb = require("../DB/connect");
const { ObjectId } = require("mongodb")

const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Users")
        .findOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const getUsers = async (req, res) => {
    try{
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Users")
        .find()  
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const createUser = async (req, res) => {
    try{
        const user = req.body;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Users")
        .insertOne(user);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
};


const updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = req.body;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Users")
        .updateOne({ _id: ObjectId(id) }, { $set: user });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Users")
        .deleteOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

//will add logic later

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    };