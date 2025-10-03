
const db = require("../config/db");

exports.getAllTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};


exports.createTask = (req, res) => {
  const { title, description, category_id, priority, due_date, is_completed } = req.body;

  const sql = `
    INSERT INTO tasks (title, description, category_id, priority, due_date, is_completed)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    description,
    category_id,
    priority,
    due_date,
    is_completed
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting task:", err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({
      message: "Task created successfully",
      taskId: result.insertId
    });
  });
};



exports.getTaskById = (req, res) => {
  db.query("SELECT * FROM tasks WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

// exports.updateTask = (req, res) => {
//   const { title, description, category_id , priority , due_date , is_completed } = req.body;
//   db.query(
//     "UPDATE tasks SET title=?, description=?, category_id=? , priority=? , due_date=? , is_completed=? WHERE id=?  ",
//     [title, description, category_id, req.params.id],
//     (err) => {
//       if (err) return res.status(500).json({ error: err });
//       res.json({ message: "Task updated" });
//     }
//   );
// };

exports.updateTask = (req, res) => {
  const allowedFields = ['title', 'description', 'category_id', 'priority', 'due_date', 'is_completed'];
  const updates = [];
  const values = [];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  if (updates.length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  // Add task ID for WHERE clause
  values.push(req.params.id);

  const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Task updated" });
  });
};


exports.deleteTask = (req, res) => {
  db.query("DELETE FROM tasks WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Task deleted" });
  });
};
