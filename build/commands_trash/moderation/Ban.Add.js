import { EmbedBuilder, GuildMember, GuildMemberManager, GuildMemberRoleManager, TextChannel, } from "discord.js";
import SubCommand from "../../base/classes/SubCommand.js";
import Guild from "../../base/database/schemas/Guild.js";
import ms from "ms";
export default class BanAdd extends SubCommand {
    constructor(client) {
        super(client, "ban.add");
    }
    async Execute(interaction, args) {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "Tidak ada alasan";
        const days = interaction.options.getString("days") || "0d";
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
        if (target.id === interaction.user.id) {
            interaction.reply({
                embeds: [
                    errorEmbed.setDescription("❌ Kamu tidak bisa ban diri sendiri"),
                ],
                ephemeral: true,
            });
            return;
        }
        if (target.roles.highest.position >=
            (interaction.member?.roles).highest.position) {
            interaction.reply({
                embeds: [
                    errorEmbed.setDescription("❌ Kamu tidak bisa ban orang lebih tinggi dari kamu"),
                ],
                ephemeral: true,
            });
            return;
        }
        if (!target.bannable) {
            interaction.reply({
                embeds: [
                    errorEmbed.setDescription("❌ User tersebut tidak bisa di ban"),
                ],
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
        target
            .send({
            embeds: [
                errorEmbed
                    .setDescription(`🔨 Kamu telah di ban dari server **${interaction.guild?.name}**\nOleh: ${interaction.member}`)
                    .setImage(interaction.guild?.iconURL()),
            ],
        })
            .catch();
        try {
            await target.ban({
                deleteMessageSeconds: parseInt(days),
                reason: `${reason} | Oleh: ${interaction.user.tag} (${interaction.user.id})`,
            });
        }
        catch (error) {
            return interaction.reply({
                embeds: [
                    errorEmbed.setDescription(`❌ Gagal ban **${target.user.tag}** dari server`),
                ],
                ephemeral: true,
            });
        }
        interaction.reply({
            embeds: [
                errorEmbed.setDescription(`🔨 Berhasil ban **${target.user.tag}** dari server`),
            ],
            ephemeral: true,
        });
        if (!silent) {
            interaction.channel
                .send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `🔨 Ban User | ${target.user.tag}` })
                        .setDescription(`**User:** ${target.user.tag} (${target.id})\n**Oleh:** ${interaction.member}\n**Alasan:** ${reason}\n**Durasi:** ${days !== "0d" ? `User akan di ban selama ${days}` : ""}`)
                        .setColor("Red")
                        .setTimestamp()
                        .setThumbnail(target.user.displayAvatarURL({ size: 64 })),
                ],
            })
                .then(async (msg) => {
                await msg.react("🔨");
                await msg.react("🤣");
                await msg.react("😛");
            });
        }
        const guild = await Guild.findOne({ guildId: interaction.guildId });
        if (guild &&
            guild.logs?.moderation?.enabled &&
            guild.logs?.moderation?.channelId) {
            (await interaction.client.channels.fetch(guild.logs.moderation.channelId))
                .send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `🔨 Ban User | ${target.user.tag}` })
                        .setDescription(`**User:** ${target.user.tag} (${target.id})\n**Oleh:** ${interaction.member}\n**Alasan:** ${reason}\n**Durasi:** ${days !== "0d" ? `User akan di ban selama ${days} hari` : ""}`)
                        .setColor("Red")
                        .setTimestamp()
                        .setThumbnail(target.user.displayAvatarURL({ size: 64 })),
                ],
            })
                .then(async (msg) => {
                await msg.react("🔨");
                await msg.react("🤣");
                await msg.react("😛");
            });
        }
    }
}
//# sourceMappingURL=Ban.Add.js.map