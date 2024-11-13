import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Message from './models/Message.js';
import dotenv from 'dotenv';
dotenv.config();
const Mongourl = process.env.Mongourl;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection with detailed error handling
const connectDB = async() => {
    try {
        await mongoose.connect(Mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Add more detailed MongoDB debugging
mongoose.set('debug', true); // This will log all MongoDB operations

// Add error handling middleware
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
    });
});

// Message route with enhanced error handling and logging
app.post('/api/v1/message/send', async(req, res) => {
    try {
        console.log('Received data:', req.body);

        // Validate incoming data
        if (!req.body.name || !req.body.email || !req.body.message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Create new message document
        const newMessage = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        // Save to database with logging
        console.log('Attempting to save message:', newMessage);
        const savedMessage = await newMessage.save();
        console.log('Message saved successfully:', savedMessage);

        res.status(201).json({
            success: true,
            message: 'Message saved successfully',
            data: savedMessage
        });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});