const db = require("../../config/db");

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tasks", (err, results) => {
      if (err) {
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

  const normalizedTask = {
    title,
    description: description ?? null,
    category_id: category_id ?? null,
    priority: priority ?? "medium",
    due_date: due_date ?? null,
    is_completed: is_completed ?? false
  };

  const sql = `
    INSERT INTO tasks
      (title, description, category_id, priority, due_date, is_completed)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    normalizedTask.title,
    normalizedTask.description,
    normalizedTask.category_id,
    normalizedTask.priority,
    normalizedTask.due_date,
    normalizedTask.is_completed
  ];

  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve({
        id: result.insertId,
        ...normalizedTask
      });
    });
  });
};

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
