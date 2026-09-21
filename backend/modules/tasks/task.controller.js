const taskService = require("./task.service");

exports.getAllTasks = async (req, res) => {
  try{
    const tasks = await taskService.getAllTasks();

    res.json(tasks);
  }catch(err) {
    console.error("Error fetching tasks: ", err);

    res.status(500).json({
      error: "Failed to fetch tasks"
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (err) {
    console.error("Error creating task:", err);

    res.status(500).json({
      error: "Failed to create task"
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    res.json(task);
  } catch (err) {
    console.error("Error fetching task:", err);

    res.status(err.statusCode || 500).json({
      error: err.statusCode ? err.message : "Failed to fetch task"
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body
    );

    res.json({
      message: "Task updated successfully",
      task
    });
  } catch (err) {
    console.error("Error updating task:", err);

    res.status(err.statusCode || 500).json({
      error: err.statusCode ? err.message : "Failed to update task"
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);

    res.json({
      message: "Task deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting task:", err);

    res.status(err.statusCode || 500).json({
      error: err.statusCode ? err.message : "Failed to delete task"
    });
  }
};