import { ChatInputCommandInteraction, Message } from "discord.js";
import Command from "../../base/classes/Command.js";
import type CustomClient from "../../base/classes/CustomClient.js";
export default class SkipMusic extends Command {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction | Message, args?: string[]): Promise<void>;
}
//# sourceMappingURL=SkipMusic.d.ts.map