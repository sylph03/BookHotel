// backend/routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Định nghĩa route API để lấy danh sách phòng
router.get('/rooms', roomController.getRooms);
router.get('/rooms/:id', roomController.getRoomById);

module.exports = router; // Ensure router is exported correctly
