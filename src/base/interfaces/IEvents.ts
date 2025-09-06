import type { Events } from "discord.js";
import type CustomClient from "../classes/CustomClient.js";
import type IEventsOptions from "./IEventOptions.js";

export default interface IEvents extends IEventsOptions {
  client: CustomClient;
}
