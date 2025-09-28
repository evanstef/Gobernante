import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, Message, PermissionFlagsBits, } from "discord.js";
import Command from "../../base/classes/Command.js";
import Category from "../../base/enums/Category.js";
export default class QueueMusic extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            description: "Menampilkan daftar musik yang ada di antrian.",
            category: Category.Music,
            default_member_permissions: PermissionFlagsBits.SendMessages.toString(),
            dm_permission: false,
            cooldown: 5,
            client: client,
            options: [],
        });
    }
    async Execute(interaction, args) {
        if (!interaction.guild || !(interaction.member instanceof GuildMember))
            return;
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            await interaction.reply({
                content: "Masuk voice dulu lah bang!",
                ephemeral: true,
            });
            return;
        }
        const player = this.client.manager.players.get(interaction.guild.id);
        if (!player || !player.queue.current) {
            await interaction.reply({
                content: "Tidak ada musik yang sedang diputar atau antrean kosong.",
                ephemeral: true,
            });
            return;
        }
        const nowPlaying = player.queue.current;
        const upcomingQueue = player.queue;
        const queueDescription = upcomingQueue
            .slice(0, 10)
            .map((track, index) => `**${index + 1}.** [${track.title}](${track.uri})`)
            .join("\n");
        const embedMessage = new EmbedBuilder()
            .setTitle("📜 Antrian Musik Gobernante")
            .setColor("Blue")
            .setThumbnail(nowPlaying.thumbnail || null)
            .setDescription(`**▶️ Sedang Diputar:**\n[${nowPlaying.title}](${nowPlaying.uri})\n\n` +
            `**Antrean Berikutnya:**\n${queueDescription || "Tidak ada lagu lain di antrean."}`)
            .setFooter({ text: `Total ${player.queue.size} lagu di antrean.` });
        await interaction.reply({
            embeds: [embedMessage],
        });
    }
}
//# sourceMappingURL=QueueMusic.js.map