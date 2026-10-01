const categoryRepository = require("./category.repository");

exports.getAllCategories = async () => {
    return  categoryRepository.findAll();
};

exports.getCategoryById = async (id) => {
    const category = await categoryRepository.findById(id);

    if(!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    return category;
};

exports.createCategory = async (categoryData) => {
    const { name, color } = categoryData;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        const error = new Error("Category name is required");
        error.statusCode = 400;
        throw error;
    }

    if (name.length > 100) {
        const error = new Error("Category name must not exceed 100 characters");
        error.statusCode = 400;
        throw error;
    }

    if (color !== undefined && !/^#[0-9A-Fa-f]{6}$/.test(color)) {
        const error = new Error("Category color must be a valid hex color");
        error.statusCode = 400;
        throw error;
    }

    return categoryRepository.create({
        name: name.trim(),
        color
    });
};


exports.updateCategory = async (id, updates) => {
    const existingCategory = await categoryRepository.findById(id);

    if(!existingCategory) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    await categoryRepository.update(id, updates);

    return  categoryRepository.findById(id);
};

exports.deleteCategory = async (id) => {
    const existingCategory = await categoryRepository.findById(id);

    if(!existingCategory) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    await categoryRepository.remove(id);
};