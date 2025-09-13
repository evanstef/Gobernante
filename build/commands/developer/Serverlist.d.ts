import { ChatInputCommandInteraction } from "discord.js";
import Command from "../../base/classes/Command.js";
import type CustomClient from "../../base/classes/CustomClient.js";
export default class ServerList extends Command {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
//# sourceMappingURL=Serverlist.d.ts.map