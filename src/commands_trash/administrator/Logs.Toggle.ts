import { EmbedBuilder, type ChatInputCommandInteraction } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import SubCommand from "../../base/classes/SubCommand.js";
import Guild from "../../base/database/schemas/Guild.js";

export default class LogsToogle extends SubCommand {
  constructor(client: CustomClient) {
    super(client, "logs.toggle");
  }

  async Execute(
    interaction: ChatInputCommandInteraction,
    args?: string[]
  ): Promise<void> {
    const type = interaction.options.getString("log-type");
    const value = interaction.options.getBoolean("toogle");
    await interaction.deferReply();
    try {
      let existingGuild = await Guild.findOne({
        guildId: interaction.guildId,
      });

      if (!existingGuild) {
        existingGuild = await Guild.create({
          guildId: interaction.guildId,
        });
      }

      // @ts-ignore
      existingGuild.logs[`${type}`].enabled = value;
      await existingGuild.save();
      const embed = new EmbedBuilder()
        .setTitle("✅ Berhasil!")
        .setDescription(
          `${value ? "Mengaktifkan" : "Menonaktif"} logs tipe **${type}**.`
        )
        .setColor("Green")
        .setTimestamp();

      await interaction.editReply({
        embeds: [embed],
      });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setTitle("❌ Gagal!")
        .setDescription(
          `Gagal ${
            value ? "Mengaktifkan" : "Menonaktif"
          } logs tipe **${type}**.`
        )
        .setColor("Red")
        .setTimestamp();

      await interaction.editReply({
        embeds: [embed],
      });
      console.error(error);
    }
  }
}
