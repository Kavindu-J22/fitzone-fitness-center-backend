const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Route to create content
router.post('/create', contentController.createContent);

// Route to get all contents
router.get('/all', contentController.getAllContents);

// Route to update content by ID
router.put('/update/:id', contentController.updateContent);

// Route to delete content by ID
router.delete('/delete/:id', contentController.deleteContent);

// Route to get all content categories
router.get('/categories', contentController.getAllContentCategories);

// Route to find content by category
router.get('/category/:category', contentController.findContentByCategory);

module.exports = router;
