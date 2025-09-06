import type { ChatInputCommandInteraction, Message } from "discord.js";
import SubCommand from "../base/classes/SubCommand.js";
import type CustomClient from "../base/classes/CustomClient.js";
export default class Winner extends SubCommand {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction | Message): Promise<void>;
}
//# sourceMappingURL=GenerateText.Winner.d.ts.map