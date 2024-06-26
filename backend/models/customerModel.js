// backend/models/userModel.js
const db = require('../config/db');

const addCustomer = (customerData) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Customers (full_name, email, phone, address, user_name, password) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [customerData.full_name, customerData.email, customerData.phone, customerData.address, customerData.user_name, customerData.password];

    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};


const getCustomerByUserName = (customerUserName) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Customers WHERE user_name = ?';

    db.query(sql, [customerUserName], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

// Hàm kiểm tra xem email có tồn tại trong cơ sở dữ liệu hay không
const emailExists = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS count FROM Customers WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
};

// Hàm kiểm tra xem phone có tồn tại trong cơ sở dữ liệu hay không
const phoneExists = (phone) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS count FROM Customers WHERE phone = ?';
    db.query(sql, [phone], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
};

// Hàm kiểm tra xem user_name có tồn tại trong cơ sở dữ liệu hay không
const userNameExists = (userName) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS count FROM Customers WHERE user_name = ?';
    db.query(sql, [userName], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
};

module.exports = {
  addCustomer,
  getCustomerByUserName,
  emailExists, 
  phoneExists,
  userNameExists
};
