import { Schema } from "mongoose";
declare const User: import("mongoose").Model<{
    guildId: string;
    userId: string;
    xp: number;
    level: number;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    guildId: string;
    userId: string;
    xp: number;
    level: number;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    guildId: string;
    userId: string;
    xp: number;
    level: number;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    guildId: string;
    userId: string;
    xp: number;
    level: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    guildId: string;
    userId: string;
    xp: number;
    level: number;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    guildId: string;
    userId: string;
    xp: number;
    level: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=User.d.ts.map