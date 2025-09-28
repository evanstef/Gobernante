// Di dalam file: src/commands/music/PlayMusic.ts
import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, PermissionFlagsBits, VoiceChannel, } from "discord.js";
import Command from "../../base/classes/Command.js";
import Category from "../../base/enums/Category.js";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, } from "@discordjs/voice";
// PERUBAHAN 1: Hapus import lama, import 'play-dl'
import play from "play-dl";
const IDLE_TIMEOUT = 3 * 60 * 1000; // 3 menit
export default class PlayMusic extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            description: "Memutar musik dari YouTube.", // Deskripsi tidak berubah
            category: Category.Music,
            default_member_permissions: PermissionFlagsBits.SendMessages.toString(),
            dm_permission: false,
            cooldown: 10,
            client: client,
            options: [
                {
                    name: "song",
                    description: "Judul atau URL pencarian untuk musik",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        });
    }
    async Execute(interaction) {
        if (!interaction.guild || !(interaction.member instanceof GuildMember))
            return;
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            await interaction.reply({
                content: "Masuk voice dulu lah bang!",
                ephemeral: true,
            });
        }
        const query = interaction.options.getString("song", true);
        await interaction.deferReply();
        const result = await this.client.manager.search(query, {
            requester: interaction.user,
        });
        if (!result.tracks.length) {
            await interaction.editReply("❌ Lagu tidak ditemukan.");
            return;
        }
        let player = this.client.manager.players.get(interaction.guild.id);
        if (!player) {
            player = await this.client.manager.createPlayer({
                guildId: interaction.guild.id,
                voiceId: voiceChannel.id,
                textId: interaction.channel.id,
                deaf: true,
            });
        }
        if (result.tracks[0]) {
            player.queue.add(result.tracks[0]);
        }
        if (!player.playing && !player.paused) {
            player.play();
        }
        if (player.queue.size >= 1) {
            await interaction.editReply(`✅ Ditambahkan ke antrean: **${result.tracks[0]?.title}**`);
        }
        else {
            await interaction.editReply(`✅ Menambahkan: **${result.tracks[0]?.title} - ${result.tracks[0]?.author}**`);
        }
    }
}
//# sourceMappingURL=PlayMusic.js.map