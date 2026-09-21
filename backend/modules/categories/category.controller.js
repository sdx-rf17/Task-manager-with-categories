const categoryService = require("./category.service");

// Get all categories
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();

        res.json(categories);
    } catch (error) {
        next(error);
    }
};

// Get category by ID
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);

        res.json(category);
    } catch (error) {
        next(error);
    }
};

// Create category
exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);

        res.status(201).json({
            message: "Category created successfully",
            category
        });
    } catch (error) {
        next(error);
    }
};

// Update category
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(
            req.params.id,
            req.body
        );

        res.json({
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        next(error);
    }
};

// Delete category
exports.deleteCategory = async (req, res, next) => {
    try {
        await categoryService.deleteCategory(req.params.id);

        res.json({
            message: "Category deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
