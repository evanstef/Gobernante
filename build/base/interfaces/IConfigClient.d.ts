import type { Collection } from "discord.js";
import type Handler from "../classes/Handler.js";
import type IConfig from "./IConfig.js";
import type Command from "../classes/Command.js";
import type SubCommand from "../classes/SubCommand.js";
import type { AudioPlayer } from "@discordjs/voice";
export default interface ICustomClient {
    handler: Handler;
    config: IConfig;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    queues: Collection<string, any>;
    players: Collection<string, AudioPlayer>;
    Init(): void;
    loadHandler(): void;
}
//# sourceMappingURL=IConfigClient.d.ts.map