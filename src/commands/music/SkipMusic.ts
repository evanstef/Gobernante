import {
  ChatInputCommandInteraction,
  GuildMember,
  Message,
  PermissionFlagsBits,
} from "discord.js";
import Command from "../../base/classes/Command.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Category from "../../base/enums/Category.js";

export default class SkipMusic extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "skip",
      description: "Melewati musik saat ini.",
      category: Category.Music,
      default_member_permissions: PermissionFlagsBits.SendMessages.toString(),
      dm_permission: false,
      cooldown: 5,
      client: client,
      options: [],
    });
  }
  async Execute(
    interaction: ChatInputCommandInteraction | Message,
    args?: string[]
  ): Promise<void> {
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

    if (!serverQueue || !player || serverQueue.songs.length === 0) {
      await interaction.reply({
        content: "Request lagu dulu lah bang!!.",
        ephemeral: true,
      });
      return;
    }

    if (serverQueue.songs.length === 1) {
      await interaction.reply({
        content: "⏭️ Tidak ada lagu selanjutnya.",
      });
      return;
    }

    const nextSong = serverQueue.songs[1];
    const success = player.stop();

    if (success) {
      await interaction.reply({
        content: `⏭️ Lanjutt ke... **${nextSong.title}**.`,
      });
    } else {
      await interaction.reply({
        content: "Gagal melewati lagu.",
        ephemeral: true,
      });
    }
  }
}
