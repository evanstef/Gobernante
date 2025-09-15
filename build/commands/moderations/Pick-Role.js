import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel, } from "discord.js";
import Command from "../../base/classes/Command.js";
import Category from "../../base/enums/Category.js";
import ReactionRole from "../../base/database/schemas/PickRole.js";
export default class ReactionRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reaction-role",
            description: "Mengatur sistem reaction role.",
            category: Category.Moderation,
            default_member_permissions: PermissionFlagsBits.ManageRoles.toString(), // Izin mengelola role
            dm_permission: false,
            cooldown: 10,
            options: [
                {
                    name: "add",
                    description: "Menambahkan aturan reaction role baru.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "channel",
                            description: "Channel tempat pesan berada.",
                            type: ApplicationCommandOptionType.Channel,
                            required: true,
                        },
                        {
                            name: "message_id",
                            description: "ID dari pesan yang akan digunakan.",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                        },
                        {
                            name: "emoji",
                            description: "Emoji yang akan digunakan sebagai tombol.",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                        },
                        {
                            name: "role",
                            description: "Role yang akan diberikan.",
                            type: ApplicationCommandOptionType.Role,
                            required: true,
                        },
                    ],
                },
            ],
            client: client,
        });
    }
    async Execute(interaction) {
        if (!interaction.guild)
            return;
        const channel = interaction.options.getChannel("channel", true);
        const messageId = interaction.options.getString("message_id", true);
        const emoji = interaction.options.getString("emoji", true);
        const role = interaction.options.getRole("role", true);
        try {
            const message = await channel.messages.fetch(messageId);
            if (!message) {
                await interaction.reply({
                    content: "Pesan tidak ditemukan di channel tersebut.",
                    ephemeral: true,
                });
                return;
            }
            await ReactionRole.create({
                guildId: interaction.guild.id,
                messageId: messageId,
                emoji: emoji,
                roleId: role.id,
            });
            await message.react(emoji);
            await interaction.reply({
                content: `✅ Berhasil! Anggota yang mereaksikan dengan ${emoji} pada pesan tersebut akan mendapatkan role ${role.name}.`,
                ephemeral: true,
            });
        }
        catch (error) {
            console.error(error);
            await interaction.reply({
                content: "Gagal mengatur reaction role. Pastikan ID pesan benar dan saya memiliki izin.",
                ephemeral: true,
            });
        }
    }
}
//# sourceMappingURL=Pick-Role.js.map