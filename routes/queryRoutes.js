const express = require('express');
const { createQuery, deleteQuery, getQueries, updateQuery } = require('../controllers/queryController');

const router = express.Router();

router.post('/createQuery', createQuery);
router.delete('/deleteQuery/:id', deleteQuery);
router.get('/allQuery', getQueries);
router.put('/updateQuery/:id', updateQuery);

module.exports = router;
