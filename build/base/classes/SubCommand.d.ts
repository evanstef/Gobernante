import type { ChatInputCommandInteraction, Message } from "discord.js";
import type ISubCommand from "../interfaces/ISubCommand.js";
import type CustomClient from "./CustomClient.js";
export default class SubCommand implements ISubCommand {
    client: CustomClient;
    name: string;
    constructor(client: CustomClient, name: string);
    Execute(interaction: ChatInputCommandInteraction | Message, args?: string[]): void;
}
//# sourceMappingURL=SubCommand.d.ts.map