const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    main: {
        type: String,
        required: [true, 'Please enter category name'],
        trim: true,
    },
    sub1: [
        {
            name: {
                type: String,
                required: true,
            },
            sub2: [
                {
                    type: String,
                    required: true,
                },
            ],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Category', categorySchema);
