const express = require('express');
const router = express.Router();
const introController = require('../controllers/introController');

router.get('/introductions', introController.getIntroductions);
router.get('/introductions/:id', introController.getIntroductionById);

module.exports = router;
