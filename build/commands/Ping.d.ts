import { ChatInputCommandInteraction, Message } from "discord.js";
import Command from "../base/classes/Command.js";
import type CustomClient from "../base/classes/CustomClient.js";
export default class Ping extends Command {
    constructor(client: CustomClient);
    Execute(intercation: ChatInputCommandInteraction | Message): Promise<void>;
}
//# sourceMappingURL=Ping.d.ts.map