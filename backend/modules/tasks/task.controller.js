const taskService = require("./task.service");

exports.getAllTasks = async (req, res, next) => {
  try{
    const tasks = await taskService.getAllTasks();

    res.json(tasks);
  }catch(error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
      next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    res.json(task);
  } catch (error) {
      next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body
    );

    res.json({
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);

    res.json({
      message: "Task deleted successfully"
    });
  } catch (error) {
      next(error);
  }
};