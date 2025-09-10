import { ChatInputCommandInteraction, GuildMember, Message, PermissionFlagsBits, } from "discord.js";
import Command from "../../base/classes/Command.js";
import Category from "../../base/enums/Category.js";
export default class StopMusic extends Command {
    constructor(client) {
        super(client, {
            name: "stop",
            description: "Menghentikan musik dan keluar dari voice channel.",
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
        const serverQueue = this.client.queues.get(interaction.guild.id);
        const player = this.client.players.get(interaction.guild.id);
        if (!serverQueue || !player) {
            await interaction.reply({
                content: "Mana ada lagu nya woi!.",
                ephemeral: true,
            });
            return;
        }
        serverQueue.songs = [];
        player.stop();
        await interaction.reply({
            content: "⏹️ Musik telah dihentikan dan antrean dibersihkan.",
        });
    }
}
//# sourceMappingURL=StopMusic.js.map