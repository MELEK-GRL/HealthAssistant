const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu kullanıcı adı zaten alınmış.' });
        }

        const user = await User.create({ name, email, password });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email || '',
            },
        });
    } catch (err) {
        res.status(400).json({ message: 'Kayıt başarısız.', details: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ name });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Geçersiz kullanıcı adı ya da şifre.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email || '',
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası.', details: err.message });
    }
});

module.exports = router;
