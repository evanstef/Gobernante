import { Collection, Events, REST, Routes, TextChannel } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";
import type Command from "../../base/classes/Command.js";
import ReactionRole from "../../base/database/schemas/PickRole.js";

export default class Ready extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Bot is ready",
      once: true,
    });
  }

  async Execute(): Promise<void> {
    console.log(`${this.client.user?.displayName} is online`);

    const commands: object[] = this.GetJson(this.client.commands);

    const rest = new REST().setToken(this.client.config.token);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), {
      body: commands,
    });

    console.log(
      `Successfully registered ${commands.length} application commands.`
    );

    try {
      console.log("Memuat aturan reaction roles ke dalam cache...");
      const rules = await ReactionRole.find();
      let count = 0;

      for (const rule of rules) {
        try {
          const guild = await this.client.guilds.fetch(rule.guildId);
          const channel = (await guild.channels.fetch(
            rule.channelId
          )) as TextChannel;
          await channel.messages.fetch(rule.messageId);
          count++;
        } catch (error) {
          console.warn(
            `Gagal memuat reaction role untuk messageId ${rule.messageId}:`,
            error
          );
        }
      }
      console.log(`✅ Berhasil memuat ${count} pesan reaction role ke cache.`);
    } catch (error) {
      console.error("Error saat memuat reaction roles:", error);
    }
  }

  private GetJson(command: Collection<string, Command>): object[] {
    const data: object[] = [];

    command.forEach((cmd) =>
      data.push({
        name: cmd.name,
        description: cmd.description,
        options: cmd.options,
        default_member_permissions: cmd.default_member_permissions.toString(),
        dm_permission: cmd.dm_permission,
      })
    );

    return data;
  }
}
