const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: [true, 'Please enter category id'],
        unique: true,
    },
    categoryName: {
        type: String,
        required: [true, 'Please enter category name'],
        trim: true,
    },
});

module.exports = mongoose.model('Category', categorySchema);
