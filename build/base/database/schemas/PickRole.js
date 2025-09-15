import { Schema, model } from "mongoose";
const reactionRoleSchema = new Schema({
    guildId: { type: String, required: true },
    messageId: { type: String, required: true },
    emoji: { type: String, required: true },
    roleId: { type: String, required: true },
});
const ReactionRole = model("ReactionRole", reactionRoleSchema);
export default ReactionRole;
//# sourceMappingURL=PickRole.js.map