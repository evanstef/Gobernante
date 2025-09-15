import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
} from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import SubCommand from "../../base/classes/SubCommand.js";

export default class QueueMusicView extends SubCommand {
  constructor(client: CustomClient) {
    super(client, "queue.view");
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
