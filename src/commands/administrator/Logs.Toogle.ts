import type { ChatInputCommandInteraction } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import SubCommand from "../../base/classes/SubCommand.js";

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
    } catch (error) {}
  }
}
