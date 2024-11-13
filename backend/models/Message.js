import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'messages' // Explicitly set collection name
});

// Add pre-save middleware for debugging
messageSchema.pre('save', function(next) {
    console.log('Before saving:', this);
    next();
});

// Add post-save middleware for debugging
messageSchema.post('save', function(doc) {
    console.log('After saving:', doc);
});

const Message = mongoose.model('Message', messageSchema);

export default Message;