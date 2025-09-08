import {
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Message,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";
import Command from "../../base/classes/Command.js";
import Category from "../../base/enums/Category.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Guild from "../../base/database/schemas/Guild.js";

export default class WelcomeGoodbye extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "welcome-goodbye",
      description: "Mengatur pesan welcome dan goodbye di server.",
      category: Category.Moderation,
      default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
      dm_permission: false,
      cooldown: 5,
      options: [
        {
          name: "setup",
          description: "Mengatur channel untuk pesan datang dan pergi.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "channel",
              description: "Pilih channel yang diinginkan.",
              type: ApplicationCommandOptionType.Channel,
              channel_types: [ChannelType.GuildText], // Hanya bisa channel teks
              required: true,
            },
          ],
        },
      ],
      client: client,
    });
  }

  async Execute(
    interaction: ChatInputCommandInteraction,
    args?: string[]
  ): Promise<void> {
    if (!interaction.guild) return;
    const subCommand = interaction.options.getSubcommand();

    if (subCommand === "setup") {
      const channel = interaction.options.getChannel("channel") as TextChannel;
      try {
        await Guild.findOneAndUpdate(
          { guildId: interaction.guild.id },
          { welcomeGoodbyeChannelId: channel.id },
          { upsert: true, new: true }
        );

        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("✅ Berhasil!")
              .setDescription(
                `Channel untuk pesan welcome dan goodbye sudah di set ke ${channel}.`
              )
              .setColor("Green")
              .setTimestamp(),
          ],
          ephemeral: true,
        });
      } catch (error) {
        console.error(error);
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("❌ Gagal!")
              .setDescription(
                "Terjadi kesalahan saat mengatur channel. Silakan coba lagi."
              )
              .setColor("Red")
              .setTimestamp(),
          ],
          ephemeral: true,
        });
      }
    }
  }
}
