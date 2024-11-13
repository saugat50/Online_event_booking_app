import mongoose from 'mongoose';
import Message from './models/Message.js';

const testDB = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/eventdb');
        console.log('Connected to MongoDB');

        // Create a test message
        const testMessage = new Message({
            name: 'Test User',
            email: 'test@test.com',
            message: 'Test message'
        });

        // Save the test message
        const savedMessage = await testMessage.save();
        console.log('Test message saved:', savedMessage);

        // Verify it was saved
        const messages = await Message.find();
        console.log('All messages:', messages);

    } catch (error) {
        console.error('Database test failed:', error);
    } finally {
        await mongoose.disconnect();
    }
};

testDB();