import type { ChatInputCommandInteraction, Message } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import SubCommand from "../../base/classes/SubCommand.js";

export default class LogsSet extends SubCommand {
  constructor(client: CustomClient) {
    super(client, "logs.set");
  }

  async Execute(
    interaction: ChatInputCommandInteraction,
    args?: string[]
  ): Promise<void> {
    const type = interaction.options.getString("log-type");
    const channel = interaction.options.getChannel("channel");
    await interaction.deferReply();
    try {
    } catch (error) {}
  }
}
