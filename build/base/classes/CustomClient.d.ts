import { Client, Collection } from "discord.js";
import type IConfig from "../interfaces/IConfig.js";
import type ICustomClient from "../interfaces/IConfigClient.js";
import Handler from "./Handler.js";
import type Command from "./Command.js";
import type SubCommand from "./SubCommand.js";
import { Kazagumo } from "kazagumo";
export default class CustomClient extends Client implements ICustomClient {
    handler: Handler;
    config: IConfig;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    manager: Kazagumo;
    constructor();
    Init(): void;
    loadHandler(): void;
}
//# sourceMappingURL=CustomClient.d.ts.map