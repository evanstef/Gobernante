import type {
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  Message,
} from "discord.js";
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
  constructor(client: CustomClient, commandOptions: ICommand) {
    this.client = client;
    this.name = commandOptions.name;
    this.description = commandOptions.description;
    this.category = commandOptions.category;
    this.options = commandOptions.options;
    this.default_member_permissions = commandOptions.default_member_permissions;
    this.dm_permission = commandOptions.dm_permission;
    this.cooldown = commandOptions.cooldown;
  }

  Execute(interaction: ChatInputCommandInteraction, args?: string[]): void {}
  AutoComplete(interaction: AutocompleteInteraction): void {}
}
