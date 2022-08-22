const Cart = require('../models/cartModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Get All Cart
exports.getAllCart = asyncErrorHandler(async (req, res, next) => {
    const cart = await Cart.find();

    res.status(200).json({
        success: true,
        cart,
    });
});
