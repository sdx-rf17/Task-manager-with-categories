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
    return  categoryRepository.create(categoryData);
}

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