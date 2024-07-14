const db = require('../config/db');

const addBooking = (bookingData) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Bookings (customer_id, start_date, end_date, total_price, note, status) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [bookingData.customer_id, bookingData.start_date, bookingData.end_date, bookingData.total_price, bookingData.note, bookingData.status];

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertId);
            }
        });
    });
};

const addBookingDetail = (bookingDetailData) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO BookingDetails (booking_id, room_id, quantity) VALUES (?, ?, ?)';
        const values = [bookingDetailData.booking_id, bookingDetailData.room_id, bookingDetailData.quantity];

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertId);
            }
        });
    });
};

const getBookings = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Bookings';
        db.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getBookingByCustomer = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Bookings WHERE customer_id = ?';
        db.query(sql,[customerId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getBookingDetails = (bookingId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM BookingDetails WHERE booking_id = ?';
        db.query(sql, [bookingId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


module.exports = {
    addBooking,
    addBookingDetail,
    getBookings,
    getBookingByCustomer,
    getBookingDetails
};
