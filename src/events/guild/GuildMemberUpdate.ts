import { Events, GuildMember, TextChannel, EmbedBuilder } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";
import Guild from "../../base/database/schemas/Guild.js";

export default class GuildMemberUpdate extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.GuildMemberUpdate,
      description: "Mencatat perubahan nickname atau role pada anggota server.",
      once: false,
    });
  }

  async Execute(oldMember: GuildMember, newMember: GuildMember) {
    try {
      const settings = await Guild.findOne({ guildId: newMember.guild.id });
      if (!settings || !settings.userLogsChannelId) return;

      const logChannel = newMember.guild.channels.cache.get(
        settings.userLogsChannelId
      ) as TextChannel;
      if (!logChannel) return;

      if (oldMember.nickname !== newMember.nickname) {
        const usernameEmbed = new EmbedBuilder()
          .setAuthor({
            name: newMember.user.username,
            iconURL: newMember.displayAvatarURL(),
          })
          .setFooter({ text: `ID: ${newMember.id}` })
          .setTimestamp()
          .setColor("Green")
          .setTitle("Ciee ganti username") // Kata-kata Anda
          .addFields(
            {
              name: "Sebelum",
              value: `\`${oldMember.nickname || "Tidak ada"}\``,
              inline: true,
            },
            {
              name: "Sesudah",
              value: `\`${newMember.nickname || "Tidak ada"}\``,
              inline: true,
            }
          );

        await logChannel.send({ embeds: [usernameEmbed] });
      }
    } catch (error) {
      console.error("Error pada event guildMemberUpdate:", error);
    }
  }
}
