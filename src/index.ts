import "dotenv/config";
import CustomClient from "./base/classes/CustomClient.js";
import play from "play-dl";
import KazagumoEvents from "./base/functions/KazagumoEvents.js";

const client = new CustomClient();

KazagumoEvents(client);

client.Init();
