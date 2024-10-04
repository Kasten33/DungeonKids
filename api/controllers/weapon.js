const mongodb = require("../DB/connect");
const { ObjectId } = require("mongodb")

const getWeapon = async (req, res) => {};


const getWeapons = async (req, res) => {
    try{
        const result = await mongodb
        .getDb()
        .collection("weapons")
        .find()  
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};


const createWeapon = async (req, res) => {};


const updateWeapon = async (req, res) => {};


const deleteWeapon = async (req, res) => {};

//will add logic later

module.exports = {
    getWeapon,
    getWeapons,
    createWeapon,
    updateWeapon,
    deleteWeapon,
    };