const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Please enter cart id'],
        unique: true,
    },
    name: [
        {
            type: Array,
            required: [true, 'Please enter cart name'],
            trim: true,
        },
    ],
});

module.exports = mongoose.model('cart', cartSchema);
