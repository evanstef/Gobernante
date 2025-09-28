import type { Collection } from "discord.js";
import type Handler from "../classes/Handler.js";
import type IConfig from "./IConfig.js";
import type Command from "../classes/Command.js";
import type SubCommand from "../classes/SubCommand.js";
import { Kazagumo } from "kazagumo";

export default interface ICustomClient {
  handler: Handler;
  config: IConfig;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;
  cooldowns: Collection<string, Collection<string, number>>;
  manager: Kazagumo;
  Init(): void;
  loadHandler(): void;
}
