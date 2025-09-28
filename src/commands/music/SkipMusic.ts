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

    const player = this.client.manager.players.get(interaction.guild.id);

    if (!player) {
      await interaction.reply({
        content: "⏭️ Tidak ada lagu selanjutnya.",
      });
      return;
    }

    player.skip();

    await interaction.reply({
      content: "⏭️ Lagu selanjutnya.",
    });
  }
}
