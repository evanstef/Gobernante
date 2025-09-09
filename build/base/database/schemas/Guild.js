// Di dalam file: src/base/database/schemas/Guild.ts
import mongoose, { Schema, model } from "mongoose";
// Definisikan struktur data untuk pengaturan server
const guildSchema = new Schema({
    guildId: { type: String, required: true, unique: true },
    logs: {
        moderation: {
            enabled: Boolean,
            channelId: String,
        },
    },
    welcomeGoodbyeChannelId: { type: String, default: null },
    userLogsChannelId: { type: String, default: null },
}, {
    timestamps: true,
});
const Guild = model("Guild", guildSchema);
export default Guild;
//# sourceMappingURL=Guild.js.map