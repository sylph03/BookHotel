// backend/models/userModel.js
const db = require('../config/db');

const insertRating = (customerId, roomId, rating, comment, images) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ratings (customer_id, room_id, rating, comment, images) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [customerId, roomId, rating, comment, JSON.stringify(images)], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


const getRatingCount = (roomId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT COUNT(*) as ratingCount FROM ratings WHERE room_id = ?';
      db.query(sql, [roomId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].ratingCount);
        }
      });
    });
};


const getRatingDistribution = (roomId) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT rating, COUNT(rating) as count 
        FROM ratings 
        WHERE room_id = ? 
        GROUP BY rating
      `;
      db.query(sql, [roomId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Tạo một đối tượng để giữ tỉ lệ các đánh giá
          const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
          results.forEach(row => {
            distribution[row.rating] = row.count;
          });
          resolve(distribution);
        }
      });
    });
};

const getAverageRating = (roomId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT ROUND(AVG(rating), 1) as averageRating FROM ratings WHERE room_id = ?';
      db.query(sql, [roomId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].averageRating);
        }
      });
    });
};


const getCustomerRatings = (roomId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        c.full_name, c.customer_image, 
        r.rating, r.comment, r.created_at, r.images
      FROM 
        ratings r
      JOIN 
        Customers c ON r.customer_id = c.customer_id
      WHERE 
        r.room_id = ?
    `;

    db.query(sql, [roomId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const checkExistingRating = (customerId, roomId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ratings WHERE customer_id = ? AND room_id = ?';
    db.query(sql, [customerId, roomId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length > 0);
      }
    });
  });
};
  

module.exports = {
    getRatingCount,
    getRatingDistribution,
    getAverageRating,
    getCustomerRatings,
    insertRating,
    checkExistingRating
}

  