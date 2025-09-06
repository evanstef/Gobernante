import { ChatInputCommandInteraction } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";
export default class InteractionCreate extends Event {
    constructor(client: CustomClient);
    Execute(interaction: ChatInputCommandInteraction): void | Promise<import("discord.js").InteractionResponse<boolean>>;
}
//# sourceMappingURL=InteractionCreate.d.ts.map