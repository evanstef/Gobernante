import { Events, Guild as DiscordGuild, EmbedBuilder } from "discord.js";
import Event from "../../base/classes/Event.js";
import Guild from "../../base/database/schemas/Guild.js";
import type CustomClient from "../../base/classes/CustomClient.js";

export default class GuildCreate extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.GuildCreate,
      description: "Menangani saat bot bergabung di server baru",
      once: false,
    });
  }

  async Execute(guild: DiscordGuild) {
    console.log(`Bot bergabung di server ${guild.name}!`);
    try {
      const existingGuild = await Guild.findOne({ guildId: guild.id });

      if (existingGuild) {
        console.log(`Data untuk server ${guild.name} sudah ada.`);
        return;
      }

      await Guild.create({
        guildId: guild.id,
      });

      const owner = await guild.fetchOwner();
      owner?.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setDescription(
              `Terima kasih telah nambahin aku ke server yapping ini ${guild.name}`
            ),
        ],
      });
    } catch (error) {
      console.error(
        `Error saat memproses guildCreate untuk ${guild.name}:`,
        error
      );
    }
  }
}
