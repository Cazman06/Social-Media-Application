const mongoose = require('mongoose');
require('dotenv').config();


const uri = process.env.MONGODB_URI;

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri);
        console.info('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

module.exports = { connectToMongoDB };