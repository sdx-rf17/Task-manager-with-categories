const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const taskRoutes = require("./modules/tasks/task.routes");
const categoryRoutes = require("./modules/categories/category.routes");

const errorMiddleware = require("./middleware/error.middleware");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running!" });
});

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);

// Error handler
app.use(errorMiddleware);

module.exports = app;