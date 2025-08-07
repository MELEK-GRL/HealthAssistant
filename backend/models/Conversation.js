const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    messages: [
        {
            text: String,
            sender: { type: String, enum: ['user', 'ai'] },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Conversation', conversationSchema);
