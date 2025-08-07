// src/utils/checkIfHealthRelated.ts
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

const systemPrompt = `
Sadece "evet" ya da "hayır" cevabı ver. Başka hiçbir şey yazma.

Kurallar:
- Küçük harfle, tırnaksız, sadece tek kelime yaz: evet | hayır
- Açıklama yapma. Örnek verme. Neden belirtme.

"evet" demen gereken konular:
• Tahlil, kan testi, idrar, EKG, MR, röntgen
• Hastalık belirtileri: ateş, baş ağrısı, mide bulantısı, döküntü
• Doktorlar, hemşireler, uzmanlıklar
• İlaçlar, reçeteler, tedavi, kullanım dozu

"hayır" demen gereken her konu:
• Astroloji, burç, ruh eşi, tarot
• Yemek, tatlı, beslenme, diyet
• Hayvanlar, bitkiler, çiçekler
• Moda, güzellik, kişisel gelişim, ilişki
• Spor, tarih, teknoloji, sosyal medya

Şüpheli ya da sınırda her mesaj için de mutlaka "hayır" yaz.
`.trim();

export const checkIfHealthRelated = async (
    messageText: string
): Promise<boolean> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: messageText },
            ],
            temperature: 0,
            max_tokens: 3,
        });

        const result = response.choices[0].message.content?.toLowerCase().trim();
        return result === "evet";
    } catch (error) {
        console.error("🛑 checkIfHealthRelated error:", error);
        return false;
    }
};
