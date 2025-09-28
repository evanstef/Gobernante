import { EmbedBuilder } from "discord.js";
import type CustomClient from "../classes/CustomClient.js";

export default (client: CustomClient) => {
  client.on("raw", (d) => client.manager.shoukaku.rawListeners(d));

  client.manager.shoukaku
    .on("ready", (name) => console.log(`✅ Lavalink Node "${name}" siap.`))
    .on("error", (name, error) =>
      console.error(`❌ Error pada Lavalink Node "${name}":`, error)
    )
    .on("close", (name, code, reason) =>
      console.warn(
        `Lavalink Node "${name}" ditutup: ${reason || "Tidak ada alasan"}`
      )
    );

  client.manager
    .on("playerStart", (player, track) => {
      const channel = client.channels.cache.get(player.textId!) as any;
      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("Green")
          .setAuthor({
            name: "Mulai Memutar",
            iconURL: client.user?.displayAvatarURL() as string,
          })
          .setDescription(
            `🎶 | Sekarang memutar **[${track.title} - ${track.author}](${track.uri})**`
          )
          .setThumbnail(track.thumbnail || null)
          .addFields(
            { name: "Oleh", value: track.author as string, inline: true },
            {
              name: "Durasi",
              value: track.isStream
                ? "🔴 LIVE"
                : new Date(track.length!).toISOString().slice(11, 19),
              inline: true,
            }
          )
          .setTimestamp();
        channel.send({ embeds: [embed] });
      }
    })
    .on("playerEnd", (player) => {
      // Dipanggil saat lagu selesai TAPI SEBELUM lagu berikutnya dimulai. Berguna untuk log.
    })
    .on("playerEmpty", (player) => {
      const channel = client.channels.cache.get(player.textId!) as any;
      if (channel) {
        channel.send(
          "⏹️ Antrean telah selesai, aku keluar dari voice channel."
        );
        player.destroy();
      }
    });
};
