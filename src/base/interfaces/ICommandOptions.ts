import type Category from "../enums/Category.js";

export default interface ICommandOptions {
  name: string;
  description: string;
  category: Category;
  options: object;
  default_member_permissions: string;
  dm_permission: boolean;
  cooldown: number;
}
