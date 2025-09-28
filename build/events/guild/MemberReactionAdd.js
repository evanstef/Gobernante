import { Events, MessageReaction, User } from "discord.js";
import Event from "../../base/classes/Event.js";
import ReactionRole from "../../base/database/schemas/PickRole.js";
export default class MessageReactionAdd extends Event {
    constructor(client) {
        super(client, {
            name: Events.MessageReactionAdd,
            description: "Memberikan role saat reaksi ditambahkan.",
            once: false,
        });
    }
    async Execute(reaction, user) {
        if (user.bot)
            return;
        if (reaction.partial)
            await reaction.fetch();
        if (reaction.message.partial)
            await reaction.message.fetch();
        const rule = await ReactionRole.findOne({
            guildId: reaction.message.guildId,
            messageId: reaction.message.id,
            channelId: reaction.message.channelId,
            emoji: reaction.emoji.name,
        });
        if (rule) {
            try {
                const member = await reaction.message.guild?.members.fetch(user.id);
                if (member) {
                    await member.roles.add(rule.roleId);
                }
            }
            catch (error) {
                console.error("Gagal memberikan role:", error);
            }
        }
    }
}
//# sourceMappingURL=MemberReactionAdd.js.map