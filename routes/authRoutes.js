const express = require('express');
const { register, login, addStaffMember } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-staff', addStaffMember);

module.exports = router;
