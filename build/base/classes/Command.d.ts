import type { ChatInputCommandInteraction, AutocompleteInteraction } from "discord.js";
import type Category from "../enums/Category.js";
import type ICommand from "../interfaces/ICommand.js";
import type CustomClient from "./CustomClient.js";
export default class Command implements ICommand {
    client: CustomClient;
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: string;
    dm_permission: boolean;
    cooldown: number;
    constructor(client: CustomClient, commandOptions: ICommand);
    Execute(interaction: ChatInputCommandInteraction, args?: string[]): void;
    AutoComplete(interaction: AutocompleteInteraction): void;
}
//# sourceMappingURL=Command.d.ts.map