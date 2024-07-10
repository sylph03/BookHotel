// backend/controllers/customerController.js
const userModel = require('../models/customerModel');

const updateCustomerInfo = async (req, res) => {
  const customerId = req.params.id;
  const infoCustomer = {
    full_name: req.body.full_name,
    birthday: req.body.birthday,
    sex: req.body.sex
  };

  try {
    const result = await userModel.changeInfoCustomer(customerId, infoCustomer); // Gọi userModel.changeInfoCustomer
    res.status(200).json({ message: 'Cập nhật thông tin khách hàng thành công', result });
  } catch (err) {
    console.error('Lỗi khi cập nhật thông tin khách hàng:', err); // Log lỗi để xác định nguyên nhân
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin khách hàng', error: err });
  }
};

const changePassword = async (req, res) => {
  const { customerId } = req.params;
  const { newPassword } = req.body;

  try {
    const result = await userModel.changePassword(customerId, newPassword);
    if (result === 1) {
      res.status(200).json({ message: 'Password changed successfully.' });
    } else {
      res.status(404).json({ error: 'Customer not found or password not updated.' });
    }
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

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
  updateCustomerInfo,
  changePassword,
  getCustomerByUserName,
  addCustomer
};
