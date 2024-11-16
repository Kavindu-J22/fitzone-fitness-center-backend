const express = require('express');
const { updateSubscription, deleteUser, getAllUsers } = require('../controllers/UserController');  // Correct import

const router = express.Router();

router.put('/UpdateSubscription', updateSubscription);
router.delete('/deleteUser/:id', deleteUser);  // Correct delete route
router.get('/allUsers', getAllUsers);

module.exports = router;
