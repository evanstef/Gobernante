import type { AutocompleteInteraction, ChatInputCommandInteraction, Message } from "discord.js";
import type CustomClient from "../classes/CustomClient.js";
import type ICommandOptions from "./ICommandOptions.js";
export default interface ICommand extends ICommandOptions {
    client: CustomClient;
    Execute?(interaction: ChatInputCommandInteraction | Message, args?: string[]): void;
    AutoComplete?(interaction: AutocompleteInteraction | Message): void;
}
//# sourceMappingURL=ICommand.d.ts.map