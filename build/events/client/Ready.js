import { Collection, Events, REST, Routes, TextChannel } from "discord.js";
import Event from "../../base/classes/Event.js";
import ReactionRole from "../../base/database/schemas/PickRole.js";
export default class Ready extends Event {
    constructor(client) {
        super(client, {
            name: Events.ClientReady,
            description: "Bot is ready",
            once: true,
        });
    }
    async Execute() {
        console.log(`${this.client.user?.displayName} is online`);
        console.log("Mencoba terhubung ke Lavalink...");
        const commands = this.GetJson(this.client.commands);
        const rest = new REST().setToken(this.client.config.token);
        rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        });
        console.log(`Successfully registered ${commands.length} application commands.`);
        try {
            console.log("Memuat aturan reaction roles ke dalam cache...");
            const rules = await ReactionRole.find();
            let count = 0;
            for (const rule of rules) {
                try {
                    const guild = await this.client.guilds.fetch(rule.guildId);
                    const channel = (await guild.channels.fetch(rule.channelId));
                    await channel.messages.fetch(rule.messageId);
                    count++;
                }
                catch (error) {
                    console.warn(`Gagal memuat reaction role untuk messageId ${rule.messageId}:`, error);
                }
            }
            console.log(`✅ Berhasil memuat ${count} pesan reaction role ke cache.`);
        }
        catch (error) {
            console.error("Error saat memuat reaction roles:", error);
        }
    }
    GetJson(command) {
        const data = [];
        command.forEach((cmd) => data.push({
            name: cmd.name,
            description: cmd.description,
            options: cmd.options,
            default_member_permissions: cmd.default_member_permissions.toString(),
            dm_permission: cmd.dm_permission,
        }));
        return data;
    }
}
//# sourceMappingURL=Ready.js.map