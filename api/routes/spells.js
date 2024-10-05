const express = require('express');
const router = express.Router();

const {
    getSpells,
    getSpell,
    createSpell,
    updateSpell,
    deleteSpell
} = require('../controllers/spell');

router.get('/', getSpells);
router.get('/:id', getSpell);
router.post('/add', createSpell);
router.patch('/:id', updateSpell);
router.delete('/:id', deleteSpell);

module.exports = router;