const db = require("../../config/db");

exports.findAll = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM categories", (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        });
    });
};

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM categories WHERE id = ?",
            [id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result[0] || null);
            }
        );
    });
};

exports.create = (category) => {
    const {
        name,
        color
    } = category;

    const sql = `
        INSERT INTO categories
            (name, color)
        VALUES (?, ?)
    `;

    const values = [name, color];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve({
                id: result.insertId,
                name,
                color
            });
        });
    });
};

exports.update = (id, updates) => {
    const allowedFields = [
        "name",
        "color"
    ];

    const fields = [];
    const values = [];

    allowedFields.forEach((field) => {
        if (updates[field] !== undefined) {
            fields.push(`${field} = ?`);
            values.push(updates[field]);
        }
    });

    if (fields.length === 0) {
        return Promise.reject(new Error("No valid fields to update"));
    }

    values.push(id);

    const sql = `
        UPDATE categories
        SET ${fields.join(", ")}
        WHERE id = ?
    `;

    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
};

exports.remove = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM categories WHERE id = ?",
            [id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            }
        );
    });
};