import { Schema, model } from "mongoose";
const userSchema = new Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
});
const User = model("User", userSchema);
export default User;
//# sourceMappingURL=User.js.map