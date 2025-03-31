const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { body } = require('express-validator');

// POST route - Handle payment
router.post('/payments', paymentController.addBooking);

router.get('/bookings', paymentController.getBookings);
router.get('/bookings/customer/:customerId', paymentController.getBookingsByCustomer); // Đảm bảo route này đúng
router.get('/bookings/:bookingId/details', paymentController.getBookingDetails);
router.get('/bookingRooms/:bookingId', paymentController.getBookingRoomByBookingId);

router.delete('/bookings/delete/:bookingId', paymentController.deleteBooking);

router.put('/bookings/:bookingId', [
    body('start_date').isISO8601().withMessage('Ngày đặt không hợp lệ'),
    body('end_date').isISO8601().withMessage('Ngày trả không hợp lệ'),
    body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled']).withMessage('Trạng thái không hợp lệ')
], paymentController.updateBooking);


module.exports = router;
