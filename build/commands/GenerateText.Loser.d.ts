import type { ChatInputCommandInteraction } from "discord.js";
import SubCommand from "../base/classes/SubCommand.js";
import type CustomClient from "../base/classes/CustomClient.js";
export default class Loser extends SubCommand {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
//# sourceMappingURL=GenerateText.Loser.d.ts.map