const taskRepository = require("./task.repository");

exports.getAllTasks = async () => {
    return await taskRepository.findAll();
};

exports.getTaskById = async (id) => {
  const task = await taskRepository.findById(id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

exports.createTask = async (taskData) => {
    return await taskRepository.create(taskData);
};

exports.updateTask = async (id, updates) => {
    const existingTask = await taskRepository.findById(id);

    if(!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    await taskRepository.update(id, updates);

    return taskRepository.findById(id);
};

exports.deleteTask = async (id) => {
    const existingTask = await taskRepository.findById(id);

    if(!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    await taskRepository.remove(id);
}