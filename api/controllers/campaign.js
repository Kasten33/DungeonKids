const mongodb = require("../DB/connect");
const { ObjectId } = require("mongodb")

const getCampaign = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Campaigns")
        .findOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const getAllCampaigns = async (req, res) => {
    try{
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Campaigns")
        .find()  
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const createCampaign = async (req, res) => {
    try{
        const campaign = req.body;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Campaigns")
        .insertOne(campaign);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
};

const updateCampaign = async (req, res) => {
    try{
        const { id } = req.params;
        const campaign = req.body;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Campaigns")
        .updateOne({ _id: ObjectId(id) }, { $set: campaign });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const deleteCampaign = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await mongodb
        .getDb()
        .db("objects")
        .collection("Campaigns")
        .deleteOne({ _id: ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCampaign,
    getAllCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign
}