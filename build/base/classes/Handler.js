import { glob } from "glob";
import path from "path";
export default class Handler {
    client;
    constructor(client) {
        this.client = client;
    }
    async loadEvents() {
        const files = (await glob("build/events/**/*.js")).map((filePath) => path.resolve(filePath));
        files.map(async (file) => {
            const event = new (await import(file)).default(this.client);
            if (!event.name)
                return console.log(`${file.split("/").pop()} is missing a name.`);
            const execute = (...args) => event.Execute(...args);
            //@ts-ignore
            if (event.once)
                this.client.once(event.name, execute);
            //@ts-ignore
            else
                this.client.on(event.name, execute);
        });
    }
    async loadCommands() {
        const files = (await glob("build/commands/**/*.js")).map((filePath) => path.resolve(filePath));
        files.map(async (file) => {
            const command = new (await import(file)).default(this.client);
            if (!command.name)
                return console.log(`${file.split("/").pop()} is missing a name.`);
            if (file.split("/").pop()?.split(".")[2])
                return this.client.subCommands.set(command.name, command);
            this.client.commands.set(command.name, command);
        });
    }
}
//# sourceMappingURL=Handler.js.map