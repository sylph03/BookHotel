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

const getBookingsByCustomer = (customerId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Bookings WHERE customer_id = ?`;
        db.query(sql, [customerId], (err, results) => {
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

const getBookingRoomByBookingId = (bookingId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                b.booking_id AS booking_id,
                c.full_name AS full_name,
                c.phone AS phone,
                c.email AS email,
                c.address AS address,
                b.status AS status,
                b.total_price AS total_price,
                bd.quantity AS quantity,
                r.room_name AS room_name,
                r.price AS price,
                r.image_url AS image_url
            FROM 
                Bookings b
                JOIN Customers c ON b.customer_id = c.customer_id
                JOIN BookingDetails bd ON b.booking_id = bd.booking_id
                JOIN Rooms r ON bd.room_id = r.room_id
            WHERE
                b.booking_id = ?;
        `;

        db.query(sql, [bookingId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


const deleteBookingDetailsByBookingId = (bookingId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM BookingDetails WHERE booking_id = ?';
        db.query(query, [bookingId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const deleteBookingById = (bookingId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Bookings WHERE booking_id = ?';
        db.query(query, [bookingId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const deleteBookingAndDetails = async (bookingId) => {
    try {
        // Xóa các chi tiết của đơn hàng
        await deleteBookingDetailsByBookingId(bookingId);
        // Xóa đơn hàng
        await deleteBookingById(bookingId);
    } catch (error) {
        throw error;
    }
};

const updateBooking = (bookingId, updateData) => {
    return new Promise((resolve, reject) => {
        const { start_date, end_date, status } = updateData;

        const sql = `
            UPDATE Bookings
            SET start_date = ?, end_date = ?, status = ?
            WHERE booking_id = ?;
        `;
        const values = [start_date, end_date, status, bookingId];

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    addBooking,
    addBookingDetail,
    getBookings,
    getBookingsByCustomer,
    getBookingDetails,
    getBookingRoomByBookingId,
    deleteBookingAndDetails,
    updateBooking
};
