import { Collection, Events, REST, Routes } from "discord.js";
import Event from "../../base/classes/Event.js";
export default class Ready extends Event {
    constructor(client) {
        super(client, {
            name: Events.ClientReady,
            description: "Bot is ready",
            once: true,
        });
    }
    Execute() {
        console.log(`${this.client.user?.displayName} is online`);
        const commands = this.GetJson(this.client.commands);
        const rest = new REST().setToken(this.client.config.token);
        rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        });
        console.log(`Successfully registered ${commands.length} application commands.`);
    }
    GetJson(command) {
        const data = [];
        command.forEach((cmd) => data.push({
            name: cmd.name,
            description: cmd.description,
            options: cmd.options,
            default_member_permissions: cmd.default_member_permissions.toString(),
            dm_permission: cmd.dm_permission,
        }));
        return data;
    }
}
//# sourceMappingURL=Ready.js.map