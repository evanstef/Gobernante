import { Events, Message } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";

export default class MessageCreate extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.MessageCreate,
      description: "Handle commands when bot joins a guild",
      once: false,
    });
  }

  async Execute(message: Message) {
    if (message.author.bot) return;

    const prefix = "!";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const subCommandName = args[0]?.toLowerCase();
    const subCommandKey = `${commandName}.${subCommandName}`;

    const subCommand = this.client.subCommands.get(subCommandKey);

    if (subCommand) {
      try {
        await subCommand.Execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply("Terjadi error saat menjalankan subcommand itu.");
      }
      return;
    }

    const command = this.client.commands.get(commandName);

    if (!command)
      return message.reply({
        content: "Gk ada perintah ini bro",
      });

    try {
      command.Execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("Terjadi error saat menjalankan perintah itu.");
    }
  }
}
