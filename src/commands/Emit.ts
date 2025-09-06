import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Events,
  Guild,
  Message,
  PermissionFlagsBits,
} from "discord.js";
import Command from "../base/classes/Command.js";
import Category from "../base/enums/Category.js";
import type CustomClient from "../base/classes/CustomClient.js";

export default class Emit extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "emit",
      description: "Emit an event",
      category: Category.Developer,
      default_member_permissions: PermissionFlagsBits.Administrator.toString(),
      dm_permission: false,
      cooldown: 1,
      client: client,
      options: [
        {
          name: "event",
          description: "Pilih event",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "Guild Create",
              value: Events.GuildCreate,
            },
            {
              name: "Guild Delete",
              value: Events.GuildDelete,
            },
          ],
        },
      ],
    });
  }

  Execute(interaction: ChatInputCommandInteraction, args?: string[]): void {
    const event = interaction.options.getString("event");
    if (event === Events.GuildCreate || event === Events.GuildDelete) {
      this.client.emit(event, interaction.guild as Guild);
    }
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setDescription(`Event ${event} dijalankan!`),
      ],
      ephemeral: true,
    });
  }
}
