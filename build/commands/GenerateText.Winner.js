import SubCommand from "../base/classes/SubCommand.js";
import ChatAi from "../base/functions/ChatAi.js";
export default class Winner extends SubCommand {
    constructor(client) {
        super(client, "text.winner");
    }
    async Execute(interaction) {
        await interaction.deferReply();
        const text = await ChatAi("Buatkan satu kalimat lumayan panjang dan tajam sebagai ejekan kemenangan yang agak kasar dalam bahasa Indonesia dengan bahasa yang tidak formal atau santai lu gue gitu misalnya. Balas HANYA dengan kalimat ejekannya saja, tanpa basa-basi atau format Markdown.", interaction.guild);
        await interaction.editReply(text);
    }
}
//# sourceMappingURL=GenerateText.Winner.js.map