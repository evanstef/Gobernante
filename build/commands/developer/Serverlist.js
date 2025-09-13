// Di dalam file: src/commands/developer/serverlist.ts
import { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField, } from "discord.js";
import Command from "../../base/classes/Command.js";
import Category from "../../base/enums/Category.js";
export default class ServerList extends Command {
    constructor(client) {
        super(client, {
            name: "serverlist",
            description: "Menampilkan semua server di mana bot berada. (Khusus Owner)",
            category: Category.Developer,
            default_member_permissions: PermissionsBitField.Flags.SendMessages.toString(),
            cooldown: 10,
            dm_permission: true,
            options: [],
            client: client,
        });
    }
    async Execute(interaction) {
        // 1. Cek apakah yang menjalankan perintah adalah pemilik bot
        if (interaction.user.id !== process.env.OWNER_ID) {
            await interaction.reply({
                content: "Hanya pemilik bot yang bisa menggunakan perintah ini.",
                ephemeral: true,
            });
            return;
        }
        await interaction.deferReply({ ephemeral: true });
        // 2. Ambil semua server dari cache client
        const guilds = this.client.guilds.cache;
        // 3. Format daftar server menjadi teks
        // Kita batasi 15 server pertama agar tidak terlalu panjang
        const guildList = guilds
            .map((guild) => `• **${guild.name}**\n  (ID: ${guild.id} | Anggota: ${guild.memberCount})`)
            .slice(0, 15)
            .join("\n");
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Terhubung di ${guilds.size} Server`)
            .setDescription(guildList || "Tidak ada server.")
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
    }
}
//# sourceMappingURL=Serverlist.js.map