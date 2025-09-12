import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionsBitField, ActivityType, } from "discord.js";
import Command from "../base/classes/Command.js";
import Category from "../base/enums/Category.js";
import RoastAi from "../base/functions/RoastAi.js";
export default class Roast extends Command {
    constructor(client) {
        super(client, {
            name: "roast",
            description: "Me-roasting seseorang berdasarkan profil lengkapnya.(siapkan mental)",
            category: Category.Fun,
            default_member_permissions: PermissionsBitField.Flags.SendMessages.toString(),
            dm_permission: false,
            cooldown: 10,
            options: [
                {
                    name: "member",
                    description: "Pengguna yang ingin di-roast.",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ],
            client: client,
        });
    }
    async Execute(interaction) {
        if (!interaction.guild)
            return;
        const target = interaction.options.getMember("member");
        if (!target) {
            await interaction.reply({
                content: "Pengguna tidak ditemukan di server ini.",
                ephemeral: true,
            });
            return;
        }
        await interaction.deferReply();
        let activityText = "Tidak sedang melakukan apa-apa.";
        if (target.presence?.activities && target.presence.activities.length > 0) {
            const activity = target.presence.activities[0];
            if (activity?.type === ActivityType.Playing) {
                activityText = `Sibuk main ${activity.name}.`;
            }
            else if (activity?.type === ActivityType.Listening &&
                activity?.name === "Spotify") {
                activityText = `Lagi dengerin lagu ${activity.details} oleh ${activity.state}.`;
            }
            else {
                activityText = `Statusnya: ${activity?.state}`;
            }
        }
        const profileData = {
            displayName: target.displayName,
            roles: target.roles.cache
                .map((role) => role.name)
                .filter((name) => name !== "@everyone")
                .join(", ") || "Tidak punya role khusus",
            highestRole: target.roles.highest.name,
            joinedAt: target.joinedAt?.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            createdAt: target.user.createdAt.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            status: target.presence?.status || "offline",
            activity: activityText,
            avatarUrl: target.user.displayAvatarURL({ extension: "png", size: 256 }),
        };
        const roastText = await RoastAi(profileData);
        const embed = new EmbedBuilder()
            .setColor("Orange")
            .setAuthor({
            name: `Siapkan Mental!! Roast untuk ${target.displayName}`,
            iconURL: profileData.avatarUrl,
        })
            .setDescription(roastText || "Maaf, AI kehabisan bahan roasting...")
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
    }
}
//# sourceMappingURL=RoastDiscord.js.map