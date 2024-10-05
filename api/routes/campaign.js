const express = require('express');
const router = express.Router();

const {
    getAllCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign
} = require('../controllers/campaign');

router.get('/', getAllCampaigns);
router.get('/:id', getCampaign);
router.post('/add', createCampaign);
router.patch('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

module.exports = router;