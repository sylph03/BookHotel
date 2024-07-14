const paymentModel = require('../models/paymentModel');

const addBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const bookingId = await paymentModel.addBooking(bookingData);
        const bookingDetails = bookingData.cartData.map(item => ({
            booking_id: bookingId,
            room_id: item.room_id,
            quantity: item.quantity,
        }));
        await Promise.all(bookingDetails.map(detail => paymentModel.addBookingDetail(detail)));
        res.status(201).json({ bookingId });
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await paymentModel.getBookings();
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBookingByCustomer = async (req, res) => {
    try {
        const bookings = await paymentModel.getBookingByCustomer(customerId);
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBookingDetails = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const bookingDetails = await paymentModel.getBookingDetails(bookingId);
        res.status(200).json(bookingDetails);
    } catch (err) {
        console.error('Error fetching booking details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addBooking,
    getBookings,
    getBookingByCustomer,
    getBookingDetails
};
