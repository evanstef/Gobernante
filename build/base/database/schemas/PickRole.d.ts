import { Schema } from "mongoose";
declare const ReactionRole: import("mongoose").Model<{
    guildId: string;
    channelId: string;
    messageId: string;
    emoji: string;
    roleId: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    guildId: string;
    channelId: string;
    messageId: string;
    emoji: string;
    roleId: string;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    guildId: string;
    channelId: string;
    messageId: string;
    emoji: string;
    roleId: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    guildId: string;
    channelId: string;
    messageId: string;
    emoji: string;
    roleId: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    guildId: string;
    channelId: string;
    messageId: string;
    emoji: string;
    roleId: string;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    guildId: string;
    channelId: string;
    messageId: string;
    emoji: string;
    roleId: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default ReactionRole;
//# sourceMappingURL=PickRole.d.ts.map