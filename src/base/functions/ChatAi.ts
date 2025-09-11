import { Chat, GoogleGenAI } from "@google/genai";
import { ChatInputCommandInteraction, Guild } from "discord.js";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
});
export default async function ChatAi(
  pertanyaan: string,
  guild: Guild | null
): Promise<string> {
  let serverInfo = "";
  if (guild) {
    const owner = await guild.members.fetch(guild.ownerId);
    serverInfo = `Kamu sedang berbicara di server bernama "${guild.name}" yang memiliki ${guild.memberCount} anggota. Pemilik server ini adalah ${owner.user.displayName}.`;
  }

  const botContext = `
    Kamu adalah sebuah bot Discord serbaguna.
    nama pencipta kamu adalah Evan Stefanus Candra. Evan ini adalah seorang programmer malas yang suka yapping tengah malam dan hobi lainnya adalah main game sambil skill issue
    Tujuannya adalah gak tau sih iseng aja buat bot ini barang kali di butuhkan buat kalian. ${serverInfo}.kalau pertanyaannya berhubungan dengan konteks ini jawabannya harus berhubungan dengan konteks ini terserah jawabnya gimana bervariasi lebih bagus gunakan bahasa yang santai yang penting berhubungan dengan konteks ini, kalau tidak ada hubungannya dengan konteks tersebut jawablah pertanyaan seperti biasa seperti hal nya AI pada umumnya namun dengan catatan gunakan gaya bahasa yang santai dan tidak terlalu formal yang gaul seperti lo gw dan agak nyeleneh.
  `;

  const prompt = `${botContext}\n\nPertanyaan Pengguna: "${pertanyaan}"\n\nJawabanmu:`;

  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      temperature: 1.0,
    },
  });

  const hasilText = result.text as string;

  return hasilText;
}
