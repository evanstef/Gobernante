import { GuildMember } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";
export default class GuildMemberRemove extends Event {
    constructor(client: CustomClient);
    Execute(member: GuildMember): Promise<void>;
}
//# sourceMappingURL=GuildMemberRemove.d.ts.map