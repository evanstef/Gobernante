import { EmbedBuilder, GuildMember, GuildMemberManager, GuildMemberRoleManager, TextChannel, } from "discord.js";
import SubCommand from "../../base/classes/SubCommand.js";
import Guild from "../../base/database/schemas/Guild.js";
export default class BanRemove extends SubCommand {
    constructor(client) {
        super(client, "ban.remove");
    }
    async Execute(interaction, args) {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "Tidak ada alasan";
        const silent = interaction.options.getBoolean("silent") || false;
        const errorEmbed = new EmbedBuilder().setColor("Red").setTimestamp();
        // kalau targetnya ga ada
        if (!target) {
            interaction.reply({
                embeds: [errorEmbed.setDescription("❌ User tidak ditemukan!")],
                ephemeral: true,
            });
            return;
        }
        if (reason.length > 512) {
            interaction.reply({
                embeds: [
                    errorEmbed.setDescription("❌ Alasan terlalu panjang, maksimal 512 karakter"),
                ],
                ephemeral: true,
            });
            return;
        }
        try {
            await interaction.guild?.members.unban(target.id, reason);
        }
        catch (error) {
            interaction.reply({
                embeds: [
                    errorEmbed.setDescription(`❌ Gagal unban **${target.user.tag}** dari server`),
                ],
                ephemeral: true,
            });
            return;
        }
        if (!silent) {
            interaction.channel
                .send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `✅ Unban User | ${target.user.tag}` })
                        .setDescription(`**User:** ${target.user.tag} (${target.id})\n**Oleh:** ${interaction.member}\n**Alasan:** ${reason}`)
                        .setColor("Green")
                        .setTimestamp()
                        .setThumbnail(target.displayAvatarURL({ size: 64 })),
                ],
            })
                .then(async (msg) => {
                await msg.react("✅");
                await msg.react("😇");
            });
        }
        // Notifikasi ke logs jika ada
        const guild = await Guild.findOne({ guildId: interaction.guildId });
        if (guild &&
            guild.logs?.moderation?.enabled &&
            guild.logs?.moderation?.channelId) {
            (await interaction.client.channels.fetch(guild.logs.moderation.channelId))
                .send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `✅ Unban User | ${target.user.tag}` })
                        .setDescription(`**User:** ${target.user.tag} (${target.id})\n**Oleh:** ${interaction.member}\n**Alasan:** ${reason}`)
                        .setColor("Green")
                        .setTimestamp()
                        .setThumbnail(target.displayAvatarURL({ size: 64 })),
                ],
            })
                .then(async (msg) => {
                await msg.react("✅");
                await msg.react("😇");
            });
        }
    }
}
//# sourceMappingURL=Ban.Remove.js.map