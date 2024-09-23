const express = require('express');
const router = express.Router();

const {
    getWeapons,
    getWeapon,
    createWeapon,
    updateWeapon,
    deleteWeapon
} = require('../controllers/weapon');

router.get('/', getWeapons);
router.get('/:id', getWeapon);
router.post('/', createWeapon);
router.put('/:id', updateWeapon);
router.delete('/:id', deleteWeapon);

module.exports = router;
