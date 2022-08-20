const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Mongoose Connected');
    });
};

module.exports = connectDatabase;
