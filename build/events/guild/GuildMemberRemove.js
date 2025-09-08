import { EmbedBuilder, Events, GuildMember, TextChannel } from "discord.js";
import Event from "../../base/classes/Event.js";
import Guild from "../../base/database/schemas/Guild.js";
export default class GuildMemberRemove extends Event {
    constructor(client) {
        super(client, {
            name: Events.GuildMemberRemove,
            description: "Menanggapi ketika member keluar ke guild",
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
            const goodbyeEmbed = new EmbedBuilder()
                .setColor("Red")
                .setAuthor({
                name: `${member.user.tag} telah keluar.`,
                iconURL: member.user.displayAvatarURL(),
            })
                .setDescription(`Sana lah kau, **${member.user.username}**.Jangan balik lagi ya anjing!`)
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter({
                text: `sisa ${member.guild.memberCount} anggota.`,
            })
                .setTimestamp();
            channel.send({ embeds: [goodbyeEmbed] }).then(async (msg) => {
                await msg.react("😢");
                await msg.react("👋");
            });
        }
        catch (error) {
            console.error("Error pada event guildMemberAdd:", error);
        }
    }
}
//# sourceMappingURL=GuildMemberRemove.js.map