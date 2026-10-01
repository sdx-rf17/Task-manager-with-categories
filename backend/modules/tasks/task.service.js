const taskRepository = require("./task.repository");
const categoryRepository = require("../categories/category.repository");

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
        const error = new Error(
            "Task completion status must be a boolean"
        );
        error.statusCode = 400;
        throw error;
    }

    if (category_id !== undefined && category_id !== null) {
        const category = await categoryRepository.findById(category_id);

        if (!category) {
            const error = new Error("Category not found");
            error.statusCode = 404;
            throw error;
        }
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

    if (!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    const {
        title,
        category_id,
        priority,
        is_completed
    } = updates;

    if (title !== undefined) {
        if (
            typeof title !== "string" ||
            title.trim().length === 0
        ) {
            const error = new Error("Task title cannot be empty");
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

        updates.title = title.trim();
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
        const error = new Error(
            "Task completion status must be a boolean"
        );
        error.statusCode = 400;
        throw error;
    }

    if (category_id !== undefined && category_id !== null) {
        const category = await categoryRepository.findById(category_id);

        if (!category) {
            const error = new Error("Category not found");
            error.statusCode = 404;
            throw error;
        }
    }

    if (Object.keys(updates).length === 0) {
        const error = new Error("No fields provided for update");
        error.statusCode = 400;
        throw error;
    }

    await taskRepository.update(id, updates);

    return taskRepository.findById(id);
};

exports.deleteTask = async (id) => {
    const existingTask = await taskRepository.findById(id);

    if (!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    await taskRepository.remove(id);
};
