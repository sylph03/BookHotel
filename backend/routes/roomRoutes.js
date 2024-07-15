const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const multer = require('multer');
const path = require('path');

// Cấu hình đa dạng để tải lên tập tin
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Định nghĩa route API để lấy danh sách phòng
router.get('/rooms', roomController.getRooms);
router.get('/rooms/:id', roomController.getRoomById);
router.delete('/rooms/delete/:id', roomController.deleteRoomById);
router.post('/rooms/add', upload.single('image'), roomController.insertRoom);
router.put('/rooms/edit', upload.single('image'), roomController.updateRoom);

module.exports = router;
