// backend/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const multer = require('multer');
const path = require('path');

// Cấu hình đa dạng để tải lên tập tin
// Cấu hình multer để lưu trữ file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });

// Định nghĩa route API để lấy thông tin khách hàng
router.get('/customers/:userName', customerController.getCustomerByUserName);

// Định nghĩa route API để thêm khách hàng mới
router.post('/customers', customerController.addCustomer);

// Định nghĩa route API để thay đổi mật khẩu của khách hàng
router.put('/customers/:customerId/changePassword', customerController.changePassword);

router.put('/customers/:id', customerController.updateCustomerInfo);

router.put('/customers/:id/changeAvatar', upload.single('image'), customerController.changeAvatar);

router.put('/customers/:id/changeAddress', customerController.changeAddress);

module.exports = router;
