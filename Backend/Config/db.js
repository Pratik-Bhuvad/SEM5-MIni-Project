const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error.message); // Log the error message
        process.exit(1);
    }
};

module.exports = connectDB;
