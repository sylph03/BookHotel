const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST route - Handle payment
router.post('/payments', paymentController.addBooking);

module.exports = router;
