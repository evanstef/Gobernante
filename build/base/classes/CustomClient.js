import { Client, Collection, GatewayIntentBits } from "discord.js";
import { CLIENT_ID, GUILD_ID, MONGO_URL, TOKEN } from "../../variable.js";
import Handler from "./Handler.js";
import { connect } from "mongoose";
export default class CustomClient extends Client {
    handler;
    config;
    commands;
    subCommands;
    cooldowns;
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages, // <-- WAJIB untuk menerima pesan
                GatewayIntentBits.MessageContent,
            ],
        });
        this.config = {
            token: TOKEN,
            discordClientId: CLIENT_ID,
            guildId: GUILD_ID,
            mongoUrl: MONGO_URL,
        };
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldowns = new Collection();
    }
    Init() {
        connect(this.config.mongoUrl)
            .then(() => {
            console.log("✅ Berhasil terhubung ke database MongoDB.");
        })
            .catch((err) => {
            console.error("❌ Gagal terhubung ke database:", err);
            // Hentikan proses bot jika koneksi database gagal saat start
            process.exit(1);
        });
        this.loadHandler();
        this.login(this.config.token).catch((err) => console.error("Failed to login:", err));
    }
    loadHandler() {
        this.handler.loadEvents();
        this.handler.loadCommands();
    }
}
//# sourceMappingURL=CustomClient.js.map