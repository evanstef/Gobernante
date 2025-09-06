import { Events, Guild as DiscordGuild, EmbedBuilder } from "discord.js";
import Event from "../../base/classes/Event.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Guild from "../../base/database/schemas/Guild.js";

export default class GuildDelete extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.GuildDelete,
      description: "Menangani saat bot keluar dari server",
      once: false,
    });
  }

  async Execute(guild: DiscordGuild) {
    try {
      const deletedGuild = await Guild.findOneAndDelete({ guildId: guild.id });
      if (deletedGuild) {
        console.log(`Data untuk server ${guild.name} telah dihapus.`);
      } else {
        console.log(`Data untuk server ${guild.name} tidak ditemukan.`);
      }
    } catch (error) {
      console.error(
        `Error saat memproses guildDelete untuk ${guild.name}:`,
        error
      );
    }
  }
}
