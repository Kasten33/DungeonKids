//used for making code look nice, and readable... will add spells if needed

const router = require("express").Router();

router.use("/user", require("./user")); 
router.use("/spells", require("./spells"));
router.use("/enemies", require("./enemies"));
router.use("/weapons", require("./weapons"));
router.use("/character", require("./character"));


module.exports = router;
