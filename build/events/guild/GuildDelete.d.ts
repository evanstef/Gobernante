import { Guild as DiscordGuild } from "discord.js";
import Event from "../../base/classes/Event.js";
import type CustomClient from "../../base/classes/CustomClient.js";
export default class GuildDelete extends Event {
    constructor(client: CustomClient);
    Execute(guild: DiscordGuild): Promise<void>;
}
//# sourceMappingURL=GuildDelete.d.ts.map