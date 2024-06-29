const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route để thêm một mục vào giỏ hàng của khách hàng
router.post('/carts', cartController.addCart);

// Route để xóa một mục khỏi giỏ hàng của khách hàng dựa trên customerId và roomId
router.delete('/carts/:customerId/:roomId', cartController.deleteCartItemByCustomerAndRoom);

// Route để cập nhật số lượng của một mục trong giỏ hàng của khách hàng dựa trên customerId và roomId
router.put('/carts/:customerId/:roomId', cartController.updateCartQuantityByCustomerAndRoom);

// Route để lấy thông tin giỏ hàng của một khách hàng dựa trên customerId
router.get('/carts/:customerId', cartController.getCart);

module.exports = router;
