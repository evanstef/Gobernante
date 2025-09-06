import type IHandler from "../interfaces/IHandler.js";
import type CustomClient from "./CustomClient.js";
export default class Handler implements IHandler {
    client: CustomClient;
    constructor(client: CustomClient);
    loadEvents(): Promise<void>;
    loadCommands(): Promise<void>;
}
//# sourceMappingURL=Handler.d.ts.map