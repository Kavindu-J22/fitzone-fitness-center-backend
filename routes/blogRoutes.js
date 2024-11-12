const express = require('express');
const router = express.Router();
const { createBlogPost, getAllBlogPosts } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Create a new blog post (Admin/Staff only)
router.post('/', protect, authorize('Admin', 'Staff'), createBlogPost);

// Get all blog posts (Admin, Staff, and Customer)
router.get('/', protect, getAllBlogPosts);

// // Update a blog post (Admin/Staff only)
// router.put('/:blogId', protect, authorize('Admin', 'Staff'), updateBlog);

// // Delete a blog post (Admin only)
// router.delete('/:blogId', protect, authorize('Admin'), deleteBlog);

module.exports = router;
