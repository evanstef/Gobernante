import { ChatInputCommandInteraction, type Message } from "discord.js";
import type CustomClient from "../base/classes/CustomClient.js";
import SubCommand from "../base/classes/SubCommand.js";
export default class Tanya extends SubCommand {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction | Message, args?: string[]): Promise<void>;
}
//# sourceMappingURL=GenerateText.Tanya.d.ts.map