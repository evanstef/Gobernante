import { ChatInputCommandInteraction } from "discord.js";
import Command from "../base/classes/Command.js";
import type CustomClient from "../base/classes/CustomClient.js";
export default class Ping extends Command {
    constructor(client: CustomClient);
    Execute(intercation: ChatInputCommandInteraction): Promise<void>;
}
//# sourceMappingURL=Ping.d.ts.map