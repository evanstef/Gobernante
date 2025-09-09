import mongoose from "mongoose";
declare const Guild: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    guildId: string;
    welcomeGoodbyeChannelId: string;
    userLogsChannelId: string;
    logs?: {
        moderation?: {
            channelId?: string | null;
            enabled?: boolean | null;
        } | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    guildId: string;
    welcomeGoodbyeChannelId: string;
    userLogsChannelId: string;
    logs?: {
        moderation?: {
            channelId?: string | null;
            enabled?: boolean | null;
        } | null;
    } | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    guildId: string;
    welcomeGoodbyeChannelId: string;
    userLogsChannelId: string;
    logs?: {
        moderation?: {
            channelId?: string | null;
            enabled?: boolean | null;
        } | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    guildId: string;
    welcomeGoodbyeChannelId: string;
    userLogsChannelId: string;
    logs?: {
        moderation?: {
            channelId?: string | null;
            enabled?: boolean | null;
        } | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    guildId: string;
    welcomeGoodbyeChannelId: string;
    userLogsChannelId: string;
    logs?: {
        moderation?: {
            channelId?: string | null;
            enabled?: boolean | null;
        } | null;
    } | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    guildId: string;
    welcomeGoodbyeChannelId: string;
    userLogsChannelId: string;
    logs?: {
        moderation?: {
            channelId?: string | null;
            enabled?: boolean | null;
        } | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Guild;
//# sourceMappingURL=Guild.d.ts.map