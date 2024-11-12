const express = require('express');
const router = express.Router();
const { createMembership, getAllMemberships } = require('../controllers/membershipController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Create a new membership plan (Admin only)
router.post('/', protect, authorize('Admin'), createMembership);

// Get all membership plans (Customer, Admin, Staff)
router.get('/', protect, getAllMemberships);

// // Update a membership plan (Admin only)
// router.put('/:membershipId', protect, authorize('Admin'), updateMembership);

// // Delete a membership plan (Admin only)
// router.delete('/:membershipId', protect, authorize('Admin'), deleteMembership);

module.exports = router;
