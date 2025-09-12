import {
  Chat,
  GoogleGenAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
});

async function urlToGenerativePart(url: string, mimeType: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType,
    },
  };
}

type ProfileData = {
  displayName: string;
  roles: string;
  status: string;
  createdAt: string;
  activity: string;
  avatarUrl: string;
};

export default async function RoastAi(
  data: ProfileData
): Promise<string | null> {
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

    const hasilText = result.text as string;

    return hasilText;
  } catch (error) {
    console.error("Error pada RoastAi:", error);
    return "AI sedang tidak mood untuk me-roasting, coba lagi nanti.";
  }
}
