import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import Command from "../base/classes/Command.js";
import type CustomClient from "../base/classes/CustomClient.js";
import Category from "../base/enums/Category.js";
import User from "../base/database/schemas/User.js";

export default class Rank extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "rank",
      description: "Melihat ranking bacot member di server.",
      category: Category.Utilities,
      options: [],
      default_member_permissions: PermissionFlagsBits.SendMessages.toString(),
      dm_permission: true,
      cooldown: 5,
      client: client,
    });
  }

  async Execute(
    interaction: ChatInputCommandInteraction,
    args?: string[]
  ): Promise<void> {
    if (!interaction.guild) return;

    await interaction.deferReply();

    const usersData = await User.find({ guildId: interaction.guild.id })
      .sort({ level: -1, xp: -1 })
      .limit(10);
    if (usersData.length === 0) {
      await interaction.editReply(
        "Belum ada data peringkat di server ini. Mulailah mengirim pesan!"
      );
      return;
    }

    const leaderboardDescription = usersData
      .map((user, index) => {
        return `**${index + 1}.** <@${user.userId}> - **Level ${
          user.level
        }** (*${user.xp} XP*)`;
      })
      .join("\n");

    const leaderboardEmbed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle(`🏆 Bacot Terbanyak!! - ${interaction.guild.name}`)
      .setDescription(leaderboardDescription)
      .setTimestamp();

    await interaction.editReply({ embeds: [leaderboardEmbed] });
  }
}
