import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  GuildMember,
  Message,
  PermissionFlagsBits,
} from "discord.js";
import Command from "../../base/classes/Command.js";
import type CustomClient from "../../base/classes/CustomClient.js";
import Category from "../../base/enums/Category.js";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import ytSearch from "yt-search";

const IDLE_TIMEOUT = 3 * 60 * 1000; // 3 menit

export default class PlayMusic extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "play",
      description: "Memutar musik dari youtube.",
      category: Category.Music,
      default_member_permissions: PermissionFlagsBits.SendMessages.toString(),
      dm_permission: false,
      cooldown: 10,
      client: client,
      options: [
        {
          name: "song",
          description: "Judul atau URL pencarian untuk musik",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async Execute(
    interaction: ChatInputCommandInteraction,
    args?: string[]
  ): Promise<void> {
    if (!interaction.guild || !(interaction.member instanceof GuildMember))
      return;

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      await interaction.reply({
        content: "Masuk voice dulu lah bang!",
        ephemeral: true,
      });
      return;
    }

    const query = interaction.options.getString("song", true);
    await interaction.deferReply();

    let video;
    if (ytdl.validateURL(query)) {
      const videoInfo = await ytdl.getInfo(query);
      video = {
        url: videoInfo.videoDetails.video_url,
        title: videoInfo.videoDetails.title,
      };
    } else {
      const searchResults = await ytSearch(query);
      if (!searchResults.videos.length) {
        await interaction.editReply({ content: "Lagu tidak ditemukan." });
        return;
      }
      video = searchResults.videos[0];
    }

    let serverQueue = this.client.queues.get(interaction.guild.id);
    if (!serverQueue) {
      serverQueue = {
        voiceChannel: voiceChannel,
        textChannel: interaction.channel,
        connection: null,
        songs: [],
        idleTimer: null,
      };
      this.client.queues.set(interaction.guild.id, serverQueue);
    }

    if (serverQueue.idleTimer) {
      clearTimeout(serverQueue.idleTimer);
      serverQueue.idleTimer = null;
    }

    serverQueue.songs.push({ url: video?.url, title: video?.title });

    let player = this.client.players.get(interaction.guild.id);
    if (!player) {
      player = createAudioPlayer();
      this.client.players.set(interaction.guild.id, player);

      player.on("error", (error) => {
        console.error(`Error pada player: ${error.message}`);
      });

      player.on(AudioPlayerStatus.Idle, () => {
        serverQueue.songs.shift();
        if (serverQueue.songs.length > 0) {
          this.playNextSong(interaction.guild!.id);
        } else {
          serverQueue.idleTimer = setTimeout(() => {
            const currentQueue = this.client.queues.get(interaction.guild!.id);
            if (currentQueue && currentQueue.songs.length === 0) {
              currentQueue.connection?.destroy();
              this.client.queues.delete(interaction.guild!.id);
              this.client.players.delete(interaction.guild!.id);
            }
          }, IDLE_TIMEOUT);
        }
      });
    }

    if (!serverQueue.connection) {
      serverQueue.connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
      serverQueue.connection.subscribe(player);
    }

    if (player.state.status === AudioPlayerStatus.Idle) {
      this.playNextSong(interaction.guild.id);
      await interaction.editReply({
        content: `🎶 Lagi muter musik: **${video?.title}**`,
      });
    } else {
      await interaction.editReply({
        content: `✅ Masuk ke antrian: **${video?.title}**`,
      });
    }
  }

  private async playNextSong(guildId: string) {
    const serverQueue = this.client.queues.get(guildId);
    const player = this.client.players.get(guildId);

    if (serverQueue && player && serverQueue.songs.length > 0) {
      if (serverQueue.idleTimer) {
        clearTimeout(serverQueue.idleTimer);
        serverQueue.idleTimer = null;
      }

      const song = serverQueue.songs[0];
      const stream = ytdl(song.url, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      });
      const resource = createAudioResource(stream);
      player.play(resource);
    }
  }
}
