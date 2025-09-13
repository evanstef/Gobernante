// Di dalam file: src/commands/developer/serverlist.ts

import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import Command from "../../base/classes/Command.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Category from "../../base/enums/Category.js";

export default class ServerList extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "serverlist",
      description:
        "Menampilkan semua server di mana bot berada. (Khusus Owner)",
      category: Category.Developer,
      default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
      cooldown: 10,
      dm_permission: true,
      options: [],
      client: client,
    });
  }

  async Execute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (interaction.user.id !== process.env.OWNER_ID) {
      await interaction.reply({
        content: "Hanya pemilik bot yang bisa menggunakan perintah ini.",
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const guilds = this.client.guilds.cache;
    const guildList = guilds
      .map(
        (guild) =>
          `• **${guild.name}**\n  (ID: ${guild.id} | Anggota: ${guild.memberCount})`
      )
      .slice(0, 15)
      .join("\n");

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`Terhubung di ${guilds.size} Server`)
      .setDescription(guildList || "Tidak ada server.")
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
}
