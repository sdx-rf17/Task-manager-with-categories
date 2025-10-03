

const db = require("../config/db");

// Get all
exports.getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Create
//

exports.createCategory = (req, res) => {
  const { name } = req.body;
  const {color} = req.body;
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
  const { name, color } = req.body;
  const { id } = req.params;

  // Collect fields that are actually provided
  const fields = [];
  const values = [];

  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name);
  }

  if (color !== undefined) {
    fields.push("color = ?");
    values.push(color);
  }

  // If nothing to update, return 400
  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update." });
  }

  const sql = `UPDATE categories SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id); // add id as last parameter

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, name, color });
  });
};


// Delete
exports.deleteCategory = (req, res) => {
  db.query("DELETE FROM categories WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Category deleted" });
  });
};
