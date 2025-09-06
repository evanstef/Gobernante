import type { Events } from "discord.js";
import type IEvents from "../interfaces/IEvents.js";
import type CustomClient from "./CustomClient.js";
import type IEventsOptions from "../interfaces/IEventOptions.js";

export default class Event implements IEvents {
  client: CustomClient;
  name: Events;
  description: string;
  once: boolean;

  constructor(client: CustomClient, eventOptions: IEventsOptions) {
    this.client = client;
    this.name = eventOptions.name;
    this.description = eventOptions.description;
    this.once = eventOptions.once;
  }

  Execute(...args: any[]): void {}
}
