import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, Message, PermissionFlagsBits, } from "discord.js";
import Command from "../../base/classes/Command.js";
import Category from "../../base/enums/Category.js";
export default class QueueMusic extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            description: "Menampilkan daftar musik yang ada di antrian.",
            category: Category.Music,
            default_member_permissions: PermissionFlagsBits.SendMessages.toString(),
            dm_permission: false,
            cooldown: 5,
            client: client,
            options: [
                {
                    name: "view",
                    description: "Melihat daftar antrean lagu.",
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: "remove",
                    description: "Menghapus lagu tertentu dari antrean.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "nomor",
                            description: "Nomor urut lagu di antrean yang akan dihapus.",
                            type: ApplicationCommandOptionType.Integer,
                            required: true,
                            min_value: 1,
                        },
                    ],
                },
            ],
        });
    }
}
//# sourceMappingURL=QueueMusic.js.map