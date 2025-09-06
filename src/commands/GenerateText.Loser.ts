import type { ChatInputCommandInteraction, Message } from "discord.js";
import SubCommand from "../base/classes/SubCommand.js";
import type CustomClient from "../base/classes/CustomClient.js";
import ChatAi from "../base/functions/ChatAi.js";

export default class Loser extends SubCommand {
  constructor(client: CustomClient) {
    super(client, "text.loser");
  }
  async Execute(
    interaction: ChatInputCommandInteraction | Message
  ): Promise<void> {
    if ("deferReply" in interaction) {
      await interaction.deferReply();
      const text = await ChatAi(
        "Buatkan satu kalimat lumayan panjang dan tajam sebagai ejekan untuk mereka yang menang dan saya di posisi kalah yang akasar dalam bahasa Indonesia dengan bahasa yang tidak formal atau santai lu gue gitu misalnya. Balas HANYA dengan kalimat saja, tanpa basa-basi atau format Markdown."
      );
      await interaction.editReply(text);
    } else {
      const text = await ChatAi(
        "Buatkan satu kalimat lumayan panjang dan tajam sebagai ejekan untuk mereka yang menang dan saya di posisi kalah yang akasar dalam bahasa Indonesia dengan bahasa yang tidak formal atau santai lu gue gitu misalnya. Balas HANYA dengan kalimat saja, tanpa basa-basi atau format Markdown."
      );
      (interaction as Message).reply(text);
    }
  }
}
