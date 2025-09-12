import { Message } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";
export default class MessageCreate extends Event {
    constructor(client: CustomClient);
    Execute(message: Message): Promise<void>;
}
//# sourceMappingURL=MessageCreate.d.ts.map