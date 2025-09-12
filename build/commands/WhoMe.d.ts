import { type ChatInputCommandInteraction } from "discord.js";
import Command from "../base/classes/Command.js";
import type CustomClient from "../base/classes/CustomClient.js";
export default class WhoMe extends Command {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction): void;
}
//# sourceMappingURL=WhoMe.d.ts.map