// backend/routes/ratingRoutes.js
const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
});
  
const upload = multer({ storage });

// Route để lấy thông tin chi tiết đánh giá sản phẩm
router.get('/rooms/:roomId/ratings', ratingController.getRoomRatingDetails);
router.post('/ratings', upload.array('images', 5), ratingController.insertRating);

module.exports = router;
