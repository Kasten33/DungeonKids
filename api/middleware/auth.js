const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const mongodb = require("../DB/connect");

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).send({ error: 'Please authenticate.' });
      }
      try {// refactoring some code for this rn, will come back to this later
        const token = authHeader.replace('Bearer ', '');
      }
     catch (e) {};
    }