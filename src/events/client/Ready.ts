import { Collection, Events, REST, Routes } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";
import type Command from "../../base/classes/Command.js";

export default class Ready extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Bot is ready",
      once: true,
    });
  }

  Execute(): void {
    console.log(`${this.client.user?.displayName} is online`);

    const commands: object[] = this.GetJson(this.client.commands);

    const rest = new REST().setToken(this.client.config.token);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), {
      body: commands,
    });

    console.log(
      `Successfully registered ${commands.length} application commands.`
    );
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
