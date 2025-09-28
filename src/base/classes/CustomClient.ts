import { Client, Collection, GatewayIntentBits } from "discord.js";
import type IConfig from "../interfaces/IConfig.js";
import { CLIENT_ID, GUILD_ID, MONGO_URL, TOKEN } from "../../variable.js";
import type ICustomClient from "../interfaces/IConfigClient.js";
import Handler from "./Handler.js";
import type Command from "./Command.js";
import type SubCommand from "./SubCommand.js";
import { connect } from "mongoose";
import { Kazagumo, Plugins } from "kazagumo";
import { Connectors } from "shoukaku";
import { soundcloud } from "play-dl";

export default class CustomClient extends Client implements ICustomClient {
  handler: Handler;
  config: IConfig;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;
  cooldowns: Collection<string, Collection<string, number>>;
  manager: Kazagumo;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
      ],
    });
    this.config = {
      token: TOKEN as string,
      discordClientId: CLIENT_ID as string,
      guildId: GUILD_ID as string,
      mongoUrl: MONGO_URL as string,
    } as IConfig;
    this.manager = new Kazagumo(
      {
        defaultSearchEngine: "soundcloud",
        send: (guildId, payload) => {
          const guild = this.guilds.cache.get(guildId);
          if (guild) guild.shard.send(payload);
        },
      },
      new Connectors.DiscordJS(this),
      [
        {
          name: "gobernante-lavalink",
          url: `${process.env.LAVALINK_HOST}:${process.env.LAVALINK_PORT}`,
          auth: process.env.LAVALINK_PASSWORD as string,
        },
      ]
    );
    this.handler = new Handler(this);
    this.commands = new Collection();
    this.subCommands = new Collection();
    this.cooldowns = new Collection();
  }

  Init(): void {
    connect(this.config.mongoUrl)
      .then(() => {
        console.log("✅ Berhasil terhubung ke database MongoDB.");
      })
      .catch((err) => {
        console.error("❌ Gagal terhubung ke database:", err);
        // Hentikan proses bot jika koneksi database gagal saat start
        process.exit(1);
      });

    this.loadHandler();
    this.login(this.config.token).catch((err) =>
      console.error("Failed to login:", err)
    );
  }

  loadHandler(): void {
    this.handler.loadEvents();
    this.handler.loadCommands();
  }
}
