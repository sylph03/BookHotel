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

const getBookingsByCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        const bookings = await paymentModel.getBookingsByCustomer(customerId);
        const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
            const details = await paymentModel.getBookingDetails(booking.booking_id);
            return { ...booking, details };
        }));
        res.status(200).json(bookingsWithDetails);
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

const getBookingRoomByBookingId = async (req, res) => {
    try {
        const { bookingId } = req.params; // Lấy bookingId từ params
        const bookingRoom = await paymentModel.getBookingRoomByBookingId(bookingId);
        res.status(200).json(bookingRoom);
    } catch (err) {
        console.error('Error fetching booking room by bookingId:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Xóa đơn hàng và các chi tiết của nó
        await paymentModel.deleteBookingAndDetails(bookingId);

        res.status(200).json({ message: 'Đơn hàng đã được xóa thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa đơn hàng:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xóa đơn hàng' });
    }
};

const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { start_date, end_date, status } = req.body;

    try {
        // Xác thực dữ liệu đầu vào
        if (!start_date || !end_date || !status) {
            return res.status(400).json({ message: 'Các trường bắt buộc phải được cung cấp.' });
        }

        // Kiểm tra giá trị status
        const validStatuses = ['Đang chờ xử lý', 'Đã xác nhận', 'Đã hủy', 'Đã hoàn thành'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
        }

        // Cập nhật thông tin đơn hàng
        const result = await paymentModel.updateBooking(bookingId, { start_date, end_date, status });

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Đơn hàng đã được cập nhật thành công' });
        } else {
            res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật đơn hàng:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật đơn hàng.' });
    }
};



module.exports = {
    addBooking,
    getBookings,
    getBookingsByCustomer,
    getBookingDetails,
    getBookingRoomByBookingId,
    deleteBooking,
    updateBooking
};
