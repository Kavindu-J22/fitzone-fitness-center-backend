const express = require('express');
const router = express.Router();
const {
  addClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  updateAttenders,
  removeAttender,
  removeAcceptedAttender,
} = require('../controllers/ClassController');

// Route to add a new class
router.post('/addClass', addClass);

// Route to get all classes
router.get('/getClasses', getClasses);

// Route to get a single class by ID
router.get('/getClass/:id', getClassById);

// Route to update a class
router.put('/updateClass/:id', updateClass);

// Route to delete a class
router.delete('/deleteClass/:id', deleteClass);

router.put('/updateAttenders', updateAttenders);

// Route to remove an attendee
router.put('/removeAttender', removeAttender);

// Route to remove an Accepted attendee
router.put('/removeAcceptedAttender', removeAcceptedAttender);

module.exports = router;
