const Category = require('../models/categoryModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Get All Category
exports.getAllCategory = asyncErrorHandler(async (req, res, next) => {
    const category = await Category.find();

    res.status(200).json({
        success: true,
        category,
    });
});

// Get All Category ---ADMIN
exports.getAdminCategory = asyncErrorHandler(async (req, res, next) => {
    const category = await Category.find();

    res.status(200).json({
        success: true,
        category,
    });
});

// Create Category ---ADMIN
exports.createCategory = asyncErrorHandler(async (req, res, next) => {
    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        category,
    });
});

// Update Category ---ADMIN
exports.updateCategory = asyncErrorHandler(async (req, res, next) => {
    let category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Category Not Found', 404));
    }

    let specs = [];
    req.body.sub1.forEach((s) => {
        sub1.push(JSON.parse(s));
    });
    req.body.sub1 = sub1;

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        category,
    });
});

// Delete Category ---ADMIN
exports.deleteCategory = asyncErrorHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Category Not Found', 404));
    }

    await category.remove();

    res.status(201).json({
        success: true,
    });
});
