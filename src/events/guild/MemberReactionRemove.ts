import { Events, MessageReaction, User } from "discord.js";
import Event from "../../base/classes/Event.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import ReactionRole from "../../base/database/schemas/PickRole.js";

export default class MessageReactionRemove extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.MessageReactionRemove,
      description: "Menghapus role saat reaksi dilepas.",
      once: false,
    });
  }

  async Execute(reaction: MessageReaction, user: User) {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

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
          await member.roles.remove(rule.roleId);
        }
      } catch (error) {
        console.error("Gagal menghapus role:", error);
      }
    }
  }
}
