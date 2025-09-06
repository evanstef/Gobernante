import { Client } from "discord.js";
import type IConfigClient from "../interfaces/IConfigClient.js";
import type IConfig from "../interfaces/IConfig.js";
export default class CustomClient extends Client implements IConfigClient {
    config: IConfig;
    constructor();
    Init(): void;
}
//# sourceMappingURL=CustomClient.d.ts.map