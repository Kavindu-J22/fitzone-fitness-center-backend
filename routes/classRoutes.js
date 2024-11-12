const express = require('express');
const router = express.Router();
const { createClass, getAllClasses } = require('../controllers/classController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Create a new class (Admin/Staff only)
router.post('/', protect, authorize('Admin', 'Staff'), createClass);

// Get all classes (Customer, Admin, Staff)
router.get('/', protect, getAllClasses);

// // Update a class (Admin/Staff only)
// router.put('/:classId', protect, authorize('Admin', 'Staff'), updateClass);

// // Delete a class (Admin only)
// router.delete('/:classId', protect, authorize('Admin'), deleteClass);

module.exports = router;
