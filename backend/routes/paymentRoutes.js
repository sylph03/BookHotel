const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST route - Handle payment
router.post('/payments', paymentController.addBooking);

router.get('/bookings', paymentController.getBookings);
router.get('/bookings/customer/:customerId', paymentController.getBookingsByCustomer); // Đảm bảo route này đúng
router.get('/bookings/:bookingId/details', paymentController.getBookingDetails);
router.get('/bookingRooms/:bookingId', paymentController.getBookingRoomByBookingId);

module.exports = router;
