import { GuildMember } from "discord.js";
import Command from "../../base/classes/Command.js";
import SubCommand from "../../base/classes/SubCommand.js";
export default class QueueMusicRemove extends SubCommand {
    constructor(client) {
        super(client, "queue.remove");
    }
    async Execute(interaction, args) {
        let trackNumber = interaction.options.getInteger("nomor", true);
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
        const serverQueue = this.client.queues.get(interaction.guild.id);
        if (!serverQueue || serverQueue.songs.length === 0) {
            await interaction.reply({
                content: "Mana ada lagu nya woi!.",
                ephemeral: true,
            });
            return;
        }
        if (trackNumber <= 0 || trackNumber > serverQueue.songs.length) {
            await interaction.reply({
                content: `Nomor tidak valid. Lagu di antrean hanya sampai nomor ${serverQueue.songs.length}.`,
                ephemeral: true,
            });
            return;
        }
        if (trackNumber === 1) {
            await interaction.reply({
                content: "Tidak bisa menghapus lagu yang sedang diputar. Gunakan `/skip`.",
                ephemeral: true,
            });
            return;
        }
        trackNumber--;
        const removedSong = serverQueue.songs.splice(trackNumber, 1);
        await interaction.reply({
            content: `✅ Berhasil menghapus **${removedSong[0].title}** dari antrean.`,
        });
    }
}
//# sourceMappingURL=QueueMusic.Remove.js.map