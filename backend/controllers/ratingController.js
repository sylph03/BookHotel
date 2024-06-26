// backend/controllers/ratingController.js

const ratingModel = require('../models/ratingModel');

const insertRating = async (req, res) => {
  const { customerId, roomId, rating, comment } = req.body;
  const images = req.files.map(file => `/uploads/${file.filename}`);

  try {
    const result = await ratingModel.insertRating(customerId, roomId, rating, comment, images);
    res.status(201).json({ message: 'Rating submitted successfully', result });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ message: 'Error submitting rating', error });
  }
};

const getRoomRatingDetails = async (req, res) => {
  const roomId = req.params.roomId;
  const customerId = req.query.customerId;

  try {
    const existingRating = await ratingModel.checkExistingRating(customerId, roomId);
    const ratingCount = await ratingModel.getRatingCount(roomId);
    const ratingDistribution = await ratingModel.getRatingDistribution(roomId);
    const averageRating = await ratingModel.getAverageRating(roomId);
    const customerRatings = await ratingModel.getCustomerRatings(roomId);

    const ratingDetails = {
      existingRating,
      ratingCount,
      ratingDistribution,
      averageRating,
      customerRatings
    };

    res.status(200).json(ratingDetails);
  } catch (err) {
    console.error('Error retrieving room rating details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getRoomRatingDetails,
  insertRating
};
