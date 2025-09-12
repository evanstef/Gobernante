import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
  Message,
  PermissionFlagsBits,
} from "discord.js";
import Command from "../../base/classes/Command.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Category from "../../base/enums/Category.js";

export default class QueueMusic extends Command {
  constructor(client: CustomClient) {
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

  async Execute(
    interaction: ChatInputCommandInteraction,
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

    if (!serverQueue || serverQueue.songs.length === 0) {
      await interaction.reply({
        content: "Mana ada lagu nya woi!.",
        ephemeral: true,
      });
      return;
    }

    const queueString = serverQueue.songs
      .map(
        (song: { title: string }, index: number) =>
          `${index + 1}. ${
            index === 0 ? song.title + " - **(Lagu Saat Ini)**" : song.title
          }`
      )
      .join("\n");

    const embedMessage = new EmbedBuilder()
      .setTitle("📜 Antrian Musik Gobernante :")
      .setDescription(queueString)
      .setColor("Blue");

    await interaction.reply({
      embeds: [embedMessage],
    });
  }
}
