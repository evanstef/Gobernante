import {
  ApplicationCommandOptionType,
  ChannelType,
  PermissionFlagsBits,
} from "discord.js";
import Command from "../../base/classes/Command.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Category from "../../base/enums/Category.js";

export default class Logs extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "logs",
      description: "Get the logs channel.",
      category: Category.Administrator,
      default_member_permissions: PermissionFlagsBits.Administrator.toString(),
      dm_permission: false,
      cooldown: 1,
      client: client,
      options: [
        {
          name: "toogle",
          description: "Toggle untuk logs channel",
          type: ApplicationCommandOptionType.Subcommand,
          required: true,
          options: [
            {
              name: "log-type",
              description: "Pilih tipe log",
              type: ApplicationCommandOptionType.String,
              required: true,
              choices: [
                {
                  name: "Moderation Logs",
                  value: "moderation",
                },
              ],
            },
            {
              name: "toogle",
              description: "Toggle untuk logs channel",
              type: ApplicationCommandOptionType.Boolean,
              required: true,
            },
          ],
        },
        {
          name: "set",
          description: "set untuk logs channel",
          type: ApplicationCommandOptionType.Subcommand,
          required: true,
          options: [
            {
              name: "log-type",
              description: "Pilih tipe log",
              type: ApplicationCommandOptionType.String,
              required: true,
              choices: [
                {
                  name: "Moderation Logs",
                  value: "moderation",
                },
              ],
            },
            {
              name: "channel",
              description: "Pilih channel untuk logs channel",
              type: ApplicationCommandOptionType.Channel,
              required: true,
              channel_types: [ChannelType.GuildText],
            },
          ],
        },
      ],
    });
  }
}
