import { EmbedBuilder, Events, TextChannel, User } from "discord.js";
import Event from "../../base/classes/Event.js";
import Guild from "../../base/database/schemas/Guild.js";
export default class UserUpdate extends Event {
    constructor(client) {
        super(client, {
            name: Events.UserUpdate,
            description: "Menanggapi ketika member di update di guild", // Deskripsi Anda
            once: false,
        });
    }
    async Execute(oldUser, newUser) {
        if (newUser.bot)
            return;
        for (const guild of this.client.guilds.cache.values()) {
            try {
                const settings = await Guild.findOne({ guildId: guild.id });
                if (!settings || !settings.userLogsChannelId)
                    continue;
                const member = await guild.members.fetch(newUser.id).catch(() => null);
                if (!member)
                    continue;
                const channel = (await guild.channels
                    .fetch(settings.userLogsChannelId)
                    .catch(() => null));
                if (!channel)
                    continue;
                if (oldUser.avatar !== newUser.avatar) {
                    const avatarEmbed = new EmbedBuilder()
                        .setAuthor({
                        name: newUser.username,
                        iconURL: newUser.displayAvatarURL(),
                    })
                        .setFooter({ text: `ID: ${newUser.id}` })
                        .setTimestamp()
                        .setColor("Blue")
                        .setTitle("Ada yang ganti avatar nih!!") // Kata-kata Anda
                        .setDescription(`${newUser} baru aja ganti avatar!`) // Kata-kata Anda
                        .setThumbnail(newUser.displayAvatarURL({ size: 128 })); // Tampilkan avatar LAMA untuk perbandingan
                    await channel.send({ embeds: [avatarEmbed] });
                }
            }
            catch (error) {
                console.error(`Error pada event userUpdate di server ${guild.name}:`, error);
            }
        }
    }
}
//# sourceMappingURL=UserUpdate.js.map