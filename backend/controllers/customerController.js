// backend/controllers/customerController.js
const userModel = require('../models/customerModel');

// Xử lý yêu cầu API để lấy thông tin khách hàng
const getCustomerByUserName = async (req, res) => {
  try {
    const customerUserName = req.params.userName;
    const customer = await userModel.getCustomerByUserName(customerUserName);
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
    
    // Kiểm tra xem email, phone và user_name đã tồn tại chưa
    const emailAlreadyExists = await userModel.emailExists(newCustomer.email);
    
    const userNameAlreadyExists = await userModel.userNameExists(newCustomer.user_name);
    if (userNameAlreadyExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    if (emailAlreadyExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const phoneAlreadyExists = await userModel.phoneExists(newCustomer.phone);
    if (phoneAlreadyExists) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    const customerId = await userModel.addCustomer(newCustomer);
    res.status(201).json({ customerId });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getCustomerByUserName,
  addCustomer
};
