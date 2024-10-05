const mongodb = require("../DB/connect");
const { ObjectId } = require("mongodb")

const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db()
        .collection("Users")
        .findOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const getUsers = async (req, res) => {};


const createUser = async (req, res) => {};


const updateUser = async (req, res) => {};


const deleteUser = async (req, res) => {};

//will add logic later

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    };