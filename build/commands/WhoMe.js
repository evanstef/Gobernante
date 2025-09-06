import { EmbedBuilder, PermissionFlagsBits, } from "discord.js";
import Command from "../base/classes/Command.js";
import Category from "../base/enums/Category.js";
export default class WhoMe extends Command {
    constructor(client) {
        super(client, {
            name: "who-am-i",
            description: "Cek siapa pencipta bot ini",
            category: Category.Utilities,
            default_member_permissions: PermissionFlagsBits.UseApplicationCommands.toString(),
            dm_permission: true,
            cooldown: 5,
            options: [],
            client: client,
        });
    }
    Execute(interaction) {
        const embed = new EmbedBuilder()
            .setAuthor({
            name: "Link GitHub Si Yapper",
            url: "https://github.com/evanstef",
            iconURL: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
        })
            .setTitle("👑 Punya siapa ini kids?")
            .setDescription(`Dilahirkan dan dibuahi oleh **Evan Stefanus Candra**.\n\n` +
            `> top yapping coder in the world.\n\n` +
            `Evan ini dikenal sebagai:\n` +
            `- Master yapping coder\n` +
            `- The Deadliner\n` +
            `- Bermain game dengan penuh skill issue\n\n` +
            `Kalau error berarti si Evan dongo! 🤣`)
            .setThumbnail("https://avatars.githubusercontent.com/u/138362986?v=4") // Ganti dengan foto Evan kalau ada
            .setFooter({
            text: "Gobernante | Powered by Evan",
        })
            .setColor(0x0099ff);
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=WhoMe.js.map