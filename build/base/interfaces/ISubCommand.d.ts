import type { ChatInputCommandInteraction } from "discord.js";
import type CustomClient from "../classes/CustomClient.js";
import type ISubCommandOptions from "./ISubCommandOptions.js";
export default interface ISubCommand extends ISubCommandOptions {
    client: CustomClient;
    Execute(interaction: ChatInputCommandInteraction): void;
}
//# sourceMappingURL=ISubCommand.d.ts.map