import { GuildMember } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";
export default class GuildMemberUpdate extends Event {
    constructor(client: CustomClient);
    Execute(oldMember: GuildMember, newMember: GuildMember): Promise<void>;
}
//# sourceMappingURL=GuildMemberUpdate.d.ts.map