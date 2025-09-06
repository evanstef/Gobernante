import { AutocompleteInteraction, ChatInputCommandInteraction, EmbedBuilder, Message, PermissionFlagsBits, } from "discord.js";
import Command from "../base/classes/Command.js";
import Category from "../base/enums/Category.js";
export default class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Menampilkan latency bot dan API",
            category: Category.Utilities,
            default_member_permissions: PermissionFlagsBits.UseApplicationCommands.toString(),
            dm_permission: true,
            cooldown: 5,
            options: [],
            client: client,
        });
    }
    async Execute(intercation) {
        const isInteraction = intercation instanceof ChatInputCommandInteraction;
        const initialReply = isInteraction
            ? await intercation.reply({
                content: "🏓 Sabar yah...",
                fetchReply: true,
            })
            : await intercation.reply({ content: "🏓 Sabar yah..." });
        const apiLatency = Math.round(this.client.ws.ping);
        const botLatency = initialReply.createdTimestamp - intercation.createdTimestamp;
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Test sinyal yah bang")
            .addFields({
            name: "API Latency",
            value: `\`\`\`${apiLatency}ms\`\`\``,
            inline: true,
        }, {
            name: "Bot Latency",
            value: `\`\`\`${botLatency}ms\`\`\``,
            inline: true,
        });
        if (isInteraction) {
            await intercation.editReply({
                content: "",
                embeds: [embed],
            });
        }
        else {
            await initialReply.edit({ content: "", embeds: [embed] });
        }
    }
}
//# sourceMappingURL=Ping.js.map