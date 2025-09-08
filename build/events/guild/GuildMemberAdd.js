import { EmbedBuilder, Events, GuildMember, TextChannel } from "discord.js";
import Event from "../../base/classes/Event.js";
import Guild from "../../base/database/schemas/Guild.js";
export default class GuildMemberAdd extends Event {
    constructor(client) {
        super(client, {
            name: Events.GuildMemberAdd,
            description: "Menanggapi ketika member bergabung ke guild",
            once: false,
        });
    }
    async Execute(member) {
        try {
            const settings = await Guild.findOne({ guildId: member.guild.id });
            if (!settings)
                return;
            const channel = member.guild.channels.cache.get(settings.welcomeGoodbyeChannelId);
            if (!channel)
                return;
            const welcomeEmbed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({
                name: `${member.user.tag} telah bergabung!`,
                iconURL: member.user.displayAvatarURL(),
            })
                .setDescription(`Wuy anjing selamat datang ya ${member}! Betah betah lah klean disini **${member.guild.name}** ya kontol`)
                .setThumbnail(member.guild.iconURL())
                .setFooter({
                text: `ini jumlah member kita ${member.guild.memberCount} anggota.`,
            })
                .setTimestamp();
            channel.send({ embeds: [welcomeEmbed] }).then(async (msg) => {
                await msg.react("🎉");
                await msg.react("👋");
            });
        }
        catch (error) {
            console.error("Error pada event guildMemberAdd:", error);
        }
    }
}
//# sourceMappingURL=GuildMemberAdd.js.map