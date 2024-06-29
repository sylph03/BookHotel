const db = require('../config/db');

const addCart = (cartData) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Carts (customer_id, room_id, quantity) VALUES (?, ?, ?)';
        const values = [cartData.customer_id, cartData.room_id, cartData.quantity];

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertId);
            }
        });
    });
};

const deleteCartItemByCustomerAndRoom = (customerId, roomId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Carts WHERE customer_id = ? AND room_id = ?';
        
        db.query(sql, [customerId, roomId], (err, result) => {
            if (err) {
                console.error('Error deleting cart item:', err);
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
};

const updateCartQuantityByCustomerAndRoom = (customerId, roomId, quantity) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Carts SET quantity = ? WHERE customer_id = ? AND room_id = ?';
        
        db.query(sql, [quantity, customerId, roomId], (err, result) => {
            if (err) {
                console.error('Error updating cart quantity:', err);
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
};

const getCart = (customerId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT c.quantity, r.room_id, r.room_name, r.image_url, r.price, (r.price * c.quantity) AS total_price
            FROM Carts c
            JOIN Rooms r ON c.room_id = r.room_id
            WHERE c.customer_id = ?
        `;
        
        db.query(sql, [customerId], (err, results) => {
            if (err) {
                console.error('Error fetching cart:', err); 
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const checkCartExistence = (customerId, roomId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Carts WHERE customer_id = ? AND room_id = ?';
        
        db.query(sql, [customerId, roomId], (err, results) => {
            if (err) {
                console.error('Error checking cart existence:', err);
                reject(err);
            } else {
                resolve(results.length > 0);
            }
        });
    });
};

module.exports = {
    addCart,
    deleteCartItemByCustomerAndRoom,
    updateCartQuantityByCustomerAndRoom,
    getCart,
    checkCartExistence
};
