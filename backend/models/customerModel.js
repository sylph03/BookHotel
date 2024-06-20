// backend/models/userModel.js
const db = require('../config/db');

const addCustomer = (customerData) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Customers (first_name, last_name, email, phone, address, user_name, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [customerData.first_name, customerData.last_name, customerData.email, customerData.phone, customerData.address, customerData.user_name, customerData.password];

    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

const updateCustomer = (customerId, customerData) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE Customers SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, user_name = ?, password = ? WHERE customer_id = ?';
    const values = [customerData.first_name, customerData.last_name, customerData.email, customerData.phone, customerData.address, customerData.user_name, customerData.password, customerId];

    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getCustomerById = (customerId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Customers WHERE customer_id = ?';

    db.query(sql, [customerId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

module.exports = {
  addCustomer,
  updateCustomer,
  getCustomerById,
};
