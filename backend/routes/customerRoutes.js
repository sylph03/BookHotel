// backend/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Định nghĩa route API để lấy thông tin khách hàng
router.get('/customers/:userName', customerController.getCustomerByUserName);

// Định nghĩa route API để thêm khách hàng mới
router.post('/customers', customerController.addCustomer);

module.exports = router; // Ensure router is exported correctly
