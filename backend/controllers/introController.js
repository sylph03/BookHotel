const introModel = require('../models/introModel');

const getIntroductions = async (req, res) => {
    try {
        const sortBy = req.query.sortBy || ''; // Lấy tham số sortBy từ query string
        const limit = parseInt(req.query.limit, 10) || 12; // Lấy tham số limit từ query string, mặc định là 12
    
        const introductions = await introModel.getIntroductions(sortBy, limit);
        res.json(introductions);
    } catch (error) {
        console.error('Error fetching introductions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getIntroductionById = async (req, res) => {
    try {
        const introductionId = req.params.id;
        const limit = parseInt(req.query.limit, 10) || 7; // Giới hạn mặc định là 7 nếu không có truy vấn limit

        const introduction = await introModel.getIntroductionById(introductionId);
        if (introduction) {
            const otherIntroductions = await introModel.getOtherIntroductions(introductionId, limit);
            res.json({ introduction, otherIntroductions });
        } else {
            res.status(404).json({ message: 'Introduction not found' });
        }
    } catch (error) {
        console.error('Error fetching introduction by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getIntroductions,
    getIntroductionById
};
