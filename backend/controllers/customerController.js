// backend/controllers/customerController.js
const userModel = require('../models/customerModel');

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

// Xử lý yêu cầu API để thêm khách hàng mới
const addCustomer = async (req, res) => {
  try {
    const newCustomer = req.body;
    const customerId = await userModel.addCustomer(newCustomer);
    res.status(201).json({ customerId });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Xử lý yêu cầu API để cập nhật thông tin khách hàng
const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const updatedCustomer = req.body;
    await userModel.updateCustomer(customerId, updatedCustomer);
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getCustomerById,
  addCustomer,
  updateCustomer,
};
