// backend/models/userModel.js
const db = require('../config/db');

const insertRoom = (roomName, roomType, price, description, imageUrl) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO rooms (room_name, type, price, description, image_url) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [roomName, roomType, price, description, imageUrl], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getRoomById = (roomId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM rooms WHERE room_id = ?';

    db.query(sql, [roomId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]); // Giả sử room_id là duy nhất và chỉ trả về một phòng
      }
    });
  });
};

const getRooms = (sortBy, limit) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM rooms';
    
    // Xử lý sắp xếp theo yêu cầu
    if (sortBy === 'name') {
      sql += ' ORDER BY room_name';
    } else if (sortBy === 'priceAsc') {
      sql += ' ORDER BY price ASC';
    } else if (sortBy === 'priceDesc') {
      sql += ' ORDER BY price DESC';
    }

    // Giới hạn số lượng phòng lấy ra
    sql += ` LIMIT ${limit}`;

    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


const getOtherRooms = (excludeRoomId, limit) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM rooms WHERE room_id != ? LIMIT ?';

    db.query(sql, [excludeRoomId, limit], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteRoom = (roomId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM rooms WHERE room_id = ?';

    db.query(sql, [roomId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
     })
  })
}

module.exports = {
  insertRoom,
  getRoomById,
  getRooms,
  getOtherRooms,
  deleteRoom
};