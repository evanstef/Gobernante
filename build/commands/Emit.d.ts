import { ChatInputCommandInteraction } from "discord.js";
import Command from "../base/classes/Command.js";
import type CustomClient from "../base/classes/CustomClient.js";
export default class Emit extends Command {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction, args?: string[]): void;
}
//# sourceMappingURL=Emit.d.ts.map