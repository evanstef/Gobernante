import { ChatInputCommandInteraction } from "discord.js";
import Command from "../../base/classes/Command.js";
import type CustomClient from "../../base/classes/CustomClient.js";
export default class QueueMusic extends Command {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction, args?: string[]): Promise<void>;
}
//# sourceMappingURL=QueueMusic.d.ts.map