// roomController.js

const roomModel = require('../models/roomModel');

// Xử lý yêu cầu API để lấy danh sách phòng
const getRooms = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || ''; // Lấy tham số sortBy từ query string
    const limit = req.query.limit || 12;   // Lấy tham số limit từ query string, mặc định là 12

    const rooms = await roomModel.getRooms(sortBy, limit);
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Xử lý yêu cầu API để lấy phòng theo ID
const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.id;
    const limit = parseInt(req.query.limit, 10) || 7; // Giới hạn mặc định là 7 nếu không có truy vấn limit

    const room = await roomModel.getRoomById(roomId);
    if (room) {
      const otherRooms = await roomModel.getOtherRooms(roomId, limit);
      res.json({ room, otherRooms });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Xử lý yêu cầu API để thêm khách hàng mới
const addCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const customerId = await userModel.addCustomer(customerData);
    res.status(201).json({ message: 'Customer added successfully', customerId });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Xử lý yêu cầu API để cập nhật thông tin khách hàng
const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customerData = req.body;
    await userModel.updateCustomer(customerId, customerData);
    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Xử lý yêu cầu API để lấy thông tin khách hàng
const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await userModel.getCustomerById(customerId);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getRooms,
  getRoomById,
  addCustomer,
  updateCustomer,
  getCustomerById
};
