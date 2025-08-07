const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `
Sen bir sağlık asistanısın. Kullanıcının yazdığı mesajın sağlıkla ilgili olup olmadığını değerlendir.

Eğer kullanıcı mesajında hastalık, semptom, ilaç, tedavi, tahlil, doktor, vücut organları, ağrı gibi tıbbi konulardan bahsediyorsa sadece evet yaz.

Eğer aşk, psikoloji, arkadaşlık, genel sohbet, kişisel gelişim, astroloji, yaşam gibi tıbbi olmayan konular varsa sadece hayır yaz.

Cevabın sadece evet ya da hayır olsun. Açıklama yazma.
`.trim();
router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
            temperature: 0,
            max_tokens: 3,
        });

        const result = completion.choices[0].message.content?.toLowerCase().trim();
        res.json({ isHealthRelated: result === 'evet' });
    } catch (err) {
        console.error('❌ check API error:', err);
        res.status(500).json({ isHealthRelated: false });
    }
});

module.exports = router;
