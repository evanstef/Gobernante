import { ApplicationCommandOptionType, ChatInputCommandInteraction, Message, PermissionFlagsBits, } from "discord.js";
import Category from "../base/enums/Category.js";
import Command from "../base/classes/Command.js";
export default class GenerateText extends Command {
    constructor(client) {
        super(client, {
            name: "text",
            description: "Perintah untuk generate text",
            category: Category.Utilities,
            default_member_permissions: PermissionFlagsBits.UseApplicationCommands.toString(),
            dm_permission: false,
            cooldown: 5,
            options: [
                {
                    name: "tanya",
                    description: "Ajukan Pertanyaan Apapun",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "pertanyaan",
                            description: "Pertanyaan Apapun",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                        },
                    ],
                },
                {
                    name: "winner",
                    description: "Generate text kemenangan",
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: "loser",
                    description: "Generate text kekalahan",
                    type: ApplicationCommandOptionType.Subcommand,
                },
            ],
            client: client,
        });
    }
}
//# sourceMappingURL=GenerateText.js.map