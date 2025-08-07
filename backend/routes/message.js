
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Mesaj alanı boş' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: message }],
            temperature: 0.5,
        });

        const answer = completion.choices[0]?.message?.content || 'Yanıt alınamadı.';
        res.json({ answer });
    } catch (err) {
        console.error('❌ OpenAI Hatası:', err);
        res.status(500).json({ error: 'OpenAI hatası oluştu' });
    }
});

module.exports = router;
