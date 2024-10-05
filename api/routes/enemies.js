const express = require('express');
const router = express.Router();

const {
    getEnemies,
    getEnemy,
    createEnemy,
    updateEnemy,
    deleteEnemy
} = require('../controllers/enemy');

router.get('/', getEnemies);
router.get('/:id', getEnemy);
router.post('/add', createEnemy);
router.patch('/:id', updateEnemy);
router.delete('/:id', deleteEnemy);

module.exports = router;
