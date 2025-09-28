import { Client, Collection, GatewayIntentBits } from "discord.js";
import { CLIENT_ID, GUILD_ID, MONGO_URL, TOKEN } from "../../variable.js";
import Handler from "./Handler.js";
import { connect } from "mongoose";
import { Kazagumo, Plugins } from "kazagumo";
import { Connectors } from "shoukaku";
import { soundcloud } from "play-dl";
export default class CustomClient extends Client {
    handler;
    config;
    commands;
    subCommands;
    cooldowns;
    manager;
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageReactions,
            ],
        });
        this.config = {
            token: TOKEN,
            discordClientId: CLIENT_ID,
            guildId: GUILD_ID,
            mongoUrl: MONGO_URL,
        };
        this.manager = new Kazagumo({
            defaultSearchEngine: "soundcloud",
            send: (guildId, payload) => {
                const guild = this.guilds.cache.get(guildId);
                if (guild)
                    guild.shard.send(payload);
            },
        }, new Connectors.DiscordJS(this), [
            {
                name: "gobernante-lavalink",
                url: `${process.env.LAVALINK_HOST}:${process.env.LAVALINK_PORT}`,
                auth: process.env.LAVALINK_PASSWORD,
            },
        ]);
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