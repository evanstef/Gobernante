import { ChatInputCommandInteraction } from "discord.js";
import Command from "../../base/classes/Command.js";
import type CustomClient from "../../base/classes/CustomClient.js";
export default class ReactionRoleCommand extends Command {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
//# sourceMappingURL=Pick-Role.d.ts.map