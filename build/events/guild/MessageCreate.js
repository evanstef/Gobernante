import { Collection, Events, Message } from "discord.js";
import Event from "../../base/classes/Event.js";
import User from "../../base/database/schemas/User.js";
const cooldowns = new Collection();
export default class MessageCreate extends Event {
    constructor(client) {
        super(client, {
            name: Events.MessageCreate,
            description: "Handle commands when bot joins a guild",
            once: false,
        });
    }
    async Execute(message) {
        if (!message.guild || message.author.bot)
            return;
        try {
            const cooldownKey = `${message.guild.id}-${message.author.id}`;
            const now = Date.now();
            const cooldownAmount = 45 * 1000;
            if (cooldowns.has(cooldownKey)) {
                const expirationTime = cooldowns.get(cooldownKey);
                if (now < expirationTime) {
                    return;
                }
            }
            cooldowns.set(cooldownKey, now + cooldownAmount);
            let userData = await User.findOne({
                guildId: message.guild.id,
                userId: message.author.id,
            });
            if (!userData) {
                userData = await User.create({
                    guildId: message.guild.id,
                    userId: message.author.id,
                });
            }
            const xpToGive = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
            userData.xp += xpToGive;
            const xpNeededForNextLevel = 5 * userData.level ** 2 + 50 * userData.level + 100;
            if (userData.xp >= xpNeededForNextLevel) {
                userData.level++;
                userData.xp = 0;
                if (message.channel && "send" in message.channel) {
                    await message.channel.send(`🎉 Geloo **<@${message.author.id}>**! Naik level lu yah **Level ${userData.level}**!`);
                }
            }
            await userData.save();
        }
        catch (error) {
            console.error("Error pada sistem leveling:", error);
        }
    }
}
//# sourceMappingURL=MessageCreate.js.map