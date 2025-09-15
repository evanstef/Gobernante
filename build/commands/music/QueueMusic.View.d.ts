import { ChatInputCommandInteraction } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import SubCommand from "../../base/classes/SubCommand.js";
export default class QueueMusicView extends SubCommand {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction, args?: string[]): Promise<void>;
}
//# sourceMappingURL=QueueMusic.View.d.ts.map