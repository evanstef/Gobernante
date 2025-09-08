import { EmbedBuilder, TextChannel, } from "discord.js";
import SubCommand from "../../base/classes/SubCommand.js";
import Guild from "../../base/database/schemas/Guild.js";
export default class LogsSet extends SubCommand {
    constructor(client) {
        super(client, "logs.set");
    }
    async Execute(interaction, args) {
        const type = interaction.options.getString("log-type");
        const channel = interaction.options.getChannel("channel");
        await interaction.deferReply();
        try {
            let existingGuild = await Guild.findOne({
                guildId: interaction.guildId,
            });
            if (!existingGuild) {
                existingGuild = await Guild.create({
                    guildId: interaction.guildId,
                });
            }
            // @ts-ignore
            existingGuild.logs[`${type}`].channelId = channel?.id;
            await existingGuild.save();
            const embed = new EmbedBuilder()
                .setTitle("✅ Berhasil!")
                .setDescription(`Update logs tipe **${type}** sudah di set ke channel ${channel}.`)
                .setColor("Green")
                .setTimestamp();
            await interaction.editReply({
                embeds: [embed],
            });
        }
        catch (error) {
            const embed = new EmbedBuilder()
                .setTitle("❌ Gagal!")
                .setDescription(`Gagal setting logs tipe **${type}**.`)
                .setColor("Red")
                .setTimestamp();
            await interaction.editReply({
                embeds: [embed],
            });
            console.error(error);
        }
    }
}
//# sourceMappingURL=Logs.Set.js.map