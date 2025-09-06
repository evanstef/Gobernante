import SubCommand from "../base/classes/SubCommand.js";
import ChatAi from "../base/functions/ChatAi.js";
export default class Loser extends SubCommand {
    constructor(client) {
        super(client, "text.loser");
    }
    async Execute(interaction) {
        if ("deferReply" in interaction) {
            await interaction.deferReply();
            const text = await ChatAi("Buatkan satu kalimat lumayan panjang dan tajam sebagai ejekan untuk mereka yang menang dan saya di posisi kalah yang akasar dalam bahasa Indonesia dengan bahasa yang tidak formal atau santai lu gue gitu misalnya. Balas HANYA dengan kalimat saja, tanpa basa-basi atau format Markdown.");
            await interaction.editReply(text);
        }
        else {
            const text = await ChatAi("Buatkan satu kalimat lumayan panjang dan tajam sebagai ejekan untuk mereka yang menang dan saya di posisi kalah yang akasar dalam bahasa Indonesia dengan bahasa yang tidak formal atau santai lu gue gitu misalnya. Balas HANYA dengan kalimat saja, tanpa basa-basi atau format Markdown.");
            interaction.reply(text);
        }
    }
}
//# sourceMappingURL=GenerateText.Loser.js.map