import { User } from "discord.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";
export default class UserUpdate extends Event {
    constructor(client: CustomClient);
    Execute(oldUser: User, newUser: User): Promise<void>;
}
//# sourceMappingURL=UserUpdate.d.ts.map