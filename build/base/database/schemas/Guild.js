// Di dalam file: src/base/database/schemas/Guild.ts
import { timeStamp } from "console";
import mongoose, { Schema, model } from "mongoose";
// Definisikan struktur data untuk pengaturan server
const guildSchema = new Schema({
    guildId: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});
const Guild = model("Guild", guildSchema);
export default Guild;
//# sourceMappingURL=Guild.js.map