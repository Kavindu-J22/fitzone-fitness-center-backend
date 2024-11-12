const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get user profile (protected)
router.get('/profile', protect, getUserProfile);

// Update user profile (protected)
router.put('/profile', protect, updateUserProfile);

// // Get all users (Admin only)
// router.get('/', protect, authorize('Admin'), getUsers);

module.exports = router;

