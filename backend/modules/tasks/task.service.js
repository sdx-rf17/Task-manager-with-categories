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
    const {
        title,
        description,
        category_id,
        priority,
        due_date,
        is_completed
    } = taskData;

    if (
        !title ||
        typeof title !== "string" ||
        title.trim().length === 0
    ) {
        const error = new Error("Task title is required");
        error.statusCode = 400;
        throw error;
    }

    if (title.length > 255) {
        const error = new Error(
            "Task title must not exceed 255 characters"
        );
        error.statusCode = 400;
        throw error;
    }

    if (
        priority !== undefined &&
        !["low", "medium", "high"].includes(priority)
    ) {
        const error = new Error(
            "Task priority must be low, medium, or high"
        );
        error.statusCode = 400;
        throw error;
    }

    if (
        is_completed !== undefined &&
        typeof is_completed !== "boolean"
    ) {
        const error = new Error("Task completion status must be a boolean");
        error.statusCode = 400;
        throw error;
    }

    return taskRepository.create({
        title: title.trim(),
        description,
        category_id,
        priority,
        due_date,
        is_completed
    });
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