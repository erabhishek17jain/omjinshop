const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config()
const MONGO_URI = process.env.MONGO_URI;
// const MONGO_URI='mongodb+srv://admin:admin@cluster0.cu8he.mongodb.net/?retryWrites=true&w=majority'

const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;