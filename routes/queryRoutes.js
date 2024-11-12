const express = require('express');
const router = express.Router();
const { submitQuery, respondToQuery } = require('../controllers/queryController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Submit a customer query
router.post('/', protect, submitQuery);

// // Get all queries (Admin/Staff only)
// router.get('/', protect, authorize('Admin', 'Staff'), getQueries);

// Respond to a query (Admin/Staff only)
router.put('/:queryId', protect, authorize('Admin', 'Staff'), respondToQuery);

module.exports = router;
