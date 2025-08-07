const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const isHealthRelated = (text) => {
    return text.toLowerCase().includes('kan') || text.toLowerCase().includes('tahlil');
};

router.post('/upload', async (req, res) => {
    try {
        const { fileName, fileBase64, text: userText } = req.body;

        if (!userText && (!fileName || !fileBase64)) {
            return res.status(400).json({ error: 'Eksik veri' });
        }

        let pdfText = '';

        if (fileName && fileBase64) {
            const buffer = Buffer.from(fileBase64, 'base64');
            const uploadDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, buffer);
            const pdfData = await pdfParse(buffer);
            pdfText = pdfData.text;

            if (!pdfText || pdfText.trim().length < 10) {
                return res.json({ answer: 'PDF içeriği çözümlenemedi veya boş olabilir.' });
            }

            if (!isHealthRelated(pdfText)) {
                return res.json({ answer: 'Yalnızca sağlıkla ilgili PDF’ler destekleniyor.' });
            }
        }

        const prompt = `
${pdfText ? `Tahlil sonuçları:\n${pdfText}\n` : ''}
${userText ? `Kullanıcı mesajı:\n${userText}` : ''}
Cevabını sağlık asistanı gibi açıkla.
`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'Sen bir sağlık asistanısın.' },
                { role: 'user', content: prompt },
            ],
        });

        const answer = completion.choices[0].message.content;
        res.json({ answer });
    } catch (err) {
        console.error('❌ Upload Hatası:', err);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});


module.exports = router;
