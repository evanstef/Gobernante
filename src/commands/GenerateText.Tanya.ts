import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  Guild,
  type Message,
} from "discord.js";
import type CustomClient from "../base/classes/CustomClient.js";
import SubCommand from "../base/classes/SubCommand.js";
import ChatAi from "../base/functions/ChatAi.js";

export default class Tanya extends SubCommand {
  constructor(client: CustomClient) {
    super(client, "text.tanya");
  }

  async Execute(
    interaction: ChatInputCommandInteraction,
    args?: string[]
  ): Promise<void> {
    try {
      const isInteraction = interaction instanceof ChatInputCommandInteraction;
      let pertanyaan: string | null = null;

      if (isInteraction) {
        pertanyaan = interaction.options.getString("pertanyaan");
      } else if (args && args.length > 0) {
        pertanyaan = args.join(" ");
      }

      if (!pertanyaan) {
        const errorMsg = "Anda harus menyertakan pertanyaan!";
        await interaction.reply({ content: errorMsg, ephemeral: true });
        return;
      }

      if (isInteraction) {
        await interaction.deferReply();
      }

      const jawabanAi = await ChatAi(pertanyaan, interaction.guild);

      if (isInteraction) {
        await interaction.editReply(jawabanAi);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:" + error);
      const embeds = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Error")
        .setDescription("⛔ Ada yang salah nih mas bro coba lagi..")
        .setFooter({
          text: "Gobernante | Powered by Evan",
        });
      if (interaction instanceof ChatInputCommandInteraction) {
        await interaction.editReply({ embeds: [embeds] });
      }
    }
  }
}
