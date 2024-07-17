const db = require('../config/db');

const getIntroductions = (sortBy, limit) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM introductions';
        
        if (sortBy === 'name') {
            sql += ' ORDER BY title';
        } else if (sortBy === 'view') {
            sql += ' ORDER BY views DESC';
        } 

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

const getOtherIntroductions = (introductionId, limit) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM introductions WHERE id != ? LIMIT ?';

        db.query(sql, [introductionId, limit], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getIntroductionById = (introductionId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM introductions WHERE id = ?';

        db.query(sql, [introductionId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
};

module.exports = {
    getIntroductions,
    getOtherIntroductions,
    getIntroductionById
};
