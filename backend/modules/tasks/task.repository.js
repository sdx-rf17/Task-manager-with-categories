const db = require ("../../config/db");

exports.findAll = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM tasks", (err, results) => {
            if(err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM tasks WHERE id = ?",
            [id],
            (err, results) => {
                if (err) {
                    return reject(err);
                }

                resolve(results[0] || null);
            }
        );
    });
};

exports.create = (task) => {
    const {
        title,
        description,
        category_id,
        priority,
        due_date,
        is_completed
    } = task;

    const sql = `
        INSERT INTO tasks
            ( title, description, category_id, priority, due_date, is_completed)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        title,
        description,
        category_id,
        priority,
        due_date,
        is_completed
    ]

    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve({
                id: result.insertId,
                title,
                description,
                category_id,
                priority,
                due_date,
                is_completed
            });
        });
    });
};

// here

exports.update = (id, updates) => {
  const allowedFields = [
    "title",
    "description",
    "category_id",
    "priority",
    "due_date",
    "is_completed"
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
    UPDATE tasks
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
      "DELETE FROM tasks WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result);
      }
    );
  });
};