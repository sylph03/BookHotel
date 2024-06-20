// backend/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Định nghĩa route API để lấy thông tin khách hàng
router.get('/customers/:id', customerController.getCustomerById);

// Định nghĩa route API để thêm khách hàng mới
router.post('/customers', customerController.addCustomer);

// Định nghĩa route API để cập nhật thông tin khách hàng
router.put('/customers/:id', customerController.updateCustomer);

module.exports = router; // Ensure router is exported correctly
