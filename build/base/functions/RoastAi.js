import { Chat, GoogleGenAI, HarmBlockThreshold, HarmCategory, } from "@google/genai";
const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
async function urlToGenerativePart(url, mimeType) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return {
        inlineData: {
            data: Buffer.from(buffer).toString("base64"),
            mimeType,
        },
    };
}
export default async function RoastAi(data) {
    try {
        const contextPrompt = `
      Berikut adalah data dari pengguna Discord yang harus kamu roast:
      - Nama: ${data.displayName}
      - Status: ${data.status}
      - Aktivitas Saat Ini: ${data.activity}
      - Akun Dibuat: ${data.createdAt}
      - Daftar Role: ${data.roles}

      Tugasmu adalah me-roasting. Berdasarkan data di atas DAN foto profil yang diberikan, roasting dengan bahasa yang gaul lo gue kasar, lucu, nyeleneh, bikin target sakit hati kalau bisa. tidak usah terlalu panjang tapi tidak telalu pendek juga.
    `;
        const imagePart = await urlToGenerativePart(data.avatarUrl, "image/png");
        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    parts: [{ text: contextPrompt }, imagePart],
                },
            ],
            config: {
                temperature: 1.0,
                safetySettings: [
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    },
                ],
            },
        });
        const hasilText = result.text;
        return hasilText;
    }
    catch (error) {
        console.error("Error pada RoastAi:", error);
        return "AI sedang tidak mood untuk me-roasting, coba lagi nanti.";
    }
}
//# sourceMappingURL=RoastAi.js.map