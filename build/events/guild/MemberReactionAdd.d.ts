import { MessageReaction, User } from "discord.js";
import Event from "../../base/classes/Event.js";
import type CustomClient from "../../base/classes/CustomClient.js";
export default class MessageReactionAdd extends Event {
    constructor(client: CustomClient);
    Execute(reaction: MessageReaction, user: User): Promise<void>;
}
//# sourceMappingURL=MemberReactionAdd.d.ts.map