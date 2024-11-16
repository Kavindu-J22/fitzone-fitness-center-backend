// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { addPayment, getAllPayments, updateStatus } = require('../controllers/paymentController');

router.post('/payments', addPayment);

// Route to get all payments
router.get('/Allpayments', getAllPayments);

// Route for updating the Status
router.put('/UpdateStatus', updateStatus);

module.exports = router;
