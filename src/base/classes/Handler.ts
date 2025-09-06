import { glob } from "glob";
import type IHandler from "../interfaces/IHandler.js";
import path from "path";
import type CustomClient from "./CustomClient.js";
import type Event from "./Event.js";
import type Command from "./Command.js";

export default class Handler implements IHandler {
  client: CustomClient;

  constructor(client: CustomClient) {
    this.client = client;
  }

  async loadEvents(): Promise<void> {
    const files = (await glob("build/events/**/*.js")).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file) => {
      const event: Event = new (await import(file)).default(this.client);

      if (!event.name)
        return console.log(`${file.split("/").pop()} is missing a name.`);

      const execute = (...args: any[]) => event.Execute(...args);

      //@ts-ignore
      if (event.once) this.client.once(event.name, execute);
      //@ts-ignore
      else this.client.on(event.name, execute);
    });
  }

  async loadCommands(): Promise<void> {
    const files = (await glob("build/commands/**/*.js")).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file) => {
      const command: Command = new (await import(file)).default(this.client);

      if (!command.name)
        return console.log(`${file.split("/").pop()} is missing a name.`);

      if (file.split("/").pop()?.split(".")[2])
        return this.client.subCommands.set(command.name, command);

      this.client.commands.set(command.name, command as Command);
    });
  }
}
