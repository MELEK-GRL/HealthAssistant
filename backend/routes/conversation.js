const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

/**
 * 🔹 GET /conversations/detail/:id
 * Belirli bir konuşmayı ID ile getir
 */
router.get('/detail/:id', async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        if (!conversation) {
            return res.status(404).json({ error: 'Konuşma bulunamadı' });
        }
        res.json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * 🔹 GET /conversations/:userId
 * Belirli bir kullanıcının tüm konuşmalarını getir
 */
router.get('/:userId', async (req, res) => {
    try {
        const conversations = await Conversation.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * 🔹 POST /conversations
 * Yeni bir konuşma oluştur
 */
router.post('/', async (req, res) => {
    try {
        const { userId, messages } = req.body;
        const conversation = new Conversation({ userId, messages });
        await conversation.save();
        res.json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * 🔹 DELETE /conversations/:id
 * Belirli bir konuşmayı sil
 */
router.delete('/:id', async (req, res) => {
    try {
        await Conversation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Konuşma silindi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
