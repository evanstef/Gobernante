import { Client } from "discord.js";
import { DISCORD_TOKEN } from "../../variable.js";
export default class CustomClient extends Client {
    config;
    constructor() {
        super({ intents: [] });
        this.config = { token: DISCORD_TOKEN };
    }
    Init() {
        this.login(this.config.token)
            .then(() => console.log("Bot is online"))
            .catch((err) => console.error("Failed to login:", err));
    }
}
//# sourceMappingURL=CustomClient.js.map