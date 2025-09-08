import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import Command from "../../base/classes/Command.js";
import Category from "../../base/enums/Category.js";
export default class Ban extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            description: "Ban user dari server atau hilangkan ban dari user tersebut.",
            category: Category.Moderation,
            default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
            dm_permission: false,
            cooldown: 5,
            client: client,
            options: [
                {
                    name: "add",
                    description: "Ban user dari server.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "target",
                            description: "Pilih user yang ingin di ban.",
                            type: ApplicationCommandOptionType.User,
                            required: true,
                        },
                        {
                            name: "reason",
                            description: "Alasan kenapa user tersebut di ban.",
                            type: ApplicationCommandOptionType.String,
                            required: false,
                        },
                        {
                            name: "days",
                            description: "Jumlah hari user tersebut di ban.",
                            type: ApplicationCommandOptionType.String,
                            required: false,
                            choices: [
                                {
                                    name: "Sebelum 1 Hari",
                                    value: "1d",
                                },
                                {
                                    name: "Sebelum 7 Hari",
                                    value: "7d",
                                },
                            ],
                        },
                        {
                            name: "silent",
                            description: "Ban user secara silent (tanpa notifikasi ke user tersebut).",
                            type: ApplicationCommandOptionType.Boolean,
                            required: false,
                        },
                    ],
                },
                {
                    name: "remove",
                    description: "Hilangkan ban dari user tersebut.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "target",
                            description: "Pilih user yang ingin dihilangkan ban.",
                            type: ApplicationCommandOptionType.User,
                            required: true,
                        },
                        {
                            name: "reason",
                            description: "Alasan kenapa user tersebut dihilangkan ban.",
                            type: ApplicationCommandOptionType.String,
                            required: false,
                        },
                        {
                            name: "silent",
                            description: "Hilangkan ban user secara silent (tanpa notifikasi ke user tersebut).",
                            type: ApplicationCommandOptionType.Boolean,
                            required: false,
                        },
                    ],
                },
            ],
        });
    }
}
//# sourceMappingURL=Ban.js.map