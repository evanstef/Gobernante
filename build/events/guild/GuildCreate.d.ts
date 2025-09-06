import { Guild as DiscordGuild } from "discord.js";
import Event from "../../base/classes/Event.js";
import type CustomClient from "../../base/classes/CustomClient.js";
export default class GuildCreate extends Event {
    constructor(client: CustomClient);
    Execute(guild: DiscordGuild): Promise<void>;
}
//# sourceMappingURL=GuildCreate.d.ts.map