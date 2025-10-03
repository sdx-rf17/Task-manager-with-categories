

const db = require("../config/db");

// Get all
exports.getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Create
exports.createCategory = (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO categories (name,color) VALUES (?,?)", [name,color], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name , color });
  });
};

// Get by ID
exports.getCategoryById = (req, res) => {
  db.query("SELECT * FROM categories WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

// Update
exports.updateCategory = (req, res) => {
  const { name } = req.body;
  db.query("UPDATE categories SET name = ? , color = ? WHERE id = ?", [name,color, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: req.params.id, name , color });
  });
};

// Delete
exports.deleteCategory = (req, res) => {
  db.query("DELETE FROM categories WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Category deleted" });
  });
};
