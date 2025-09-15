import { type ChatInputCommandInteraction } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import SubCommand from "../../base/classes/SubCommand.js";
export default class QueueMusicRemove extends SubCommand {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction, args?: string[]): Promise<void>;
}
//# sourceMappingURL=QueueMusic.Remove.d.ts.map