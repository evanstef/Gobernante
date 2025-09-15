<h1 align="center">Gobernante Bot Discord
</h1>
Jadi, bot ini namanya Gobernante, artinya 'penguasa' pake bahasa Spanyol. Awalnya, gw bikin bot ini buat seru-seruan aja sama temen-temen pas maen Valorant. Tujuannya simpel: buat generate trash talk otomatis buat ngatain musuh, mau kita lagi menang ataupun kalah.

Tapi lama-lama gw kembangin biar jadi bot 'penguasa' serba bisa di server. Sekarang fiturnya ada buat nyambut member baru, ngasih tau kalo ada yang ganti nama atau avatar, sampe bisa muter lagu, bisa tanya apa aja sama bot ini ya simple sih cuman pake API Google AI Studio, dan masih banyak lagi. sebenarnya bot kyk gini udh banyak tapi gw pengen punya satu bot buatan sendiri yang bisa ngelakuin semuanya, jadi server gw sama temen-temen cukup pake satu bot ini aja, hehe.

<span style="color: yellow;">_Catatan: Gw sengaja gak pake hosting luar buat bot ini, jadi murni jalan di PC lokal gw pake Docker. Alasannya simpel: susah cari hosting gratisan wkwkwk mau gratisan. Kalaupun ada, RAM yang ditawarin kecil banget, gak bakal kuat buat nampung semua fitur bot yang mungkin nantinya makin banyak.\*\*_</span>

## Fitur

- **Pesan Selamat Datang & Perpisahan**: Bot dapat mengirim pesan selamat datang saat pengguna bergabung ke server dan pesan perpisahan saat mereka keluar.

- **Generator Teks**: Bot dapat menghasilkan teks berdasarkan prompt yang diberikan. Teks yang dihasilkan bisa berupa kalimat sederhana, paragraf, atau bahkan tulisan yang panjang.

- **Pemutar Musik**: Bot dapat memutar, melewati (skip), dan menghentikan (stop) musik di dalam voice channel.

- **List Server**: Bot dapat menampilkan daftar server di mana bot berada.

- **Siapa Saya (Info Bot)**: Bot dapat membalas pesan dengan informasi tentang dirinya, seperti siapa penciptanya dan kapan ia dibuat.

- **Roasting Member**: Bot dapat me-roasting member yang ada di dalam server. saran siapkan mental.

- **Ranking**: Bot dapat menampilkan peringkat member di server semakin banyak mereka mengirim pesan, semakin tinggi level membernya.

- **Pick Role (Reaction Role)**: Bot dapat memilih role berdasarkan reaksi emoji yang ditekan oleh member di server.

- **Perintah Ping**: Bot memiliki perintah ping yang bisa digunakan untuk mengecek latency (jeda waktu) bot.

- **Log Aktivitas Pengguna**: Bot dapat mencatat aktivitas pengguna, seperti saat mereka memperbarui username atau avatar mereka.

## Commands

Gw pake "/" command yak soalnya kalo pake "!" udah bot versi lama yang begitu kebanyakan udh pada migrasi ke "/" terus pake "/" juga langsung muncul kok autocomplete lebih mudah dipake.

- **`/welcome-goodbye setup channel:<channel>`**
  Menetapkan channel di mana bot akan mengirim pesan saat ada anggota yang bergabung atau keluar.(**Admin Only**)
- **`/user-logs setup channel:<channel>`**
  Menetapkan channel di mana bot akan mengirim notifikasi jika ada anggota yang mengubah nickname, username, atau avatar.(**Admin Only**)
- **`/reaction-role add channel:<channel> message_id:<message_id> emoji:<emoji> role:<role>`**
  Menambahkan aturan reaction role baru.(**Admin Only**)
- **`/serverlist`**
  Menampilkan daftar server di mana bot berada.(**Owner Only**)
- **`/play song:<judul_atau_url_youtube>`**
  Memutar musik berdasarkan prompt yang diberikan.
- **`/stop`**
  Menghentikan musik yang sedang diputar.
- **`/skip`**
  Melewati musik yang sedang diputar.
- **`/queue`**
  Menampilkan daftar musik yang sedang diputar di antrian.
- **`/text tanya pertanyaan:<text_pertanyaan>`**
  Mengajukan pertanyaan apa pun ke AI. Bot akan menjawab berdasarkan konteks yang telah diberikan (info server, pencipta, dll.).
- **`/text winner`**
  Menghasilkan kalimat ejekan kemenangan.
- **`/text loser`**
  Menghasilkan kalimat ejekan kalah.
- **`/roast member:<member>`**
  Me-roasting member yang ada di dalam server.(siapkan mental anda)
- **`/rank`**
  Menampilkan peringkat member di server.(pesan terbanyak)
- **`/who-am-i`**
  Menampilkan informasi tentang bot.
- **`/ping`**
  Menampilkan latensi bot dan API latency.

## Syarat & Ketentuan

- Node.js v20 atau yang lebih baru.
- Discord.js v14 atau yang lebih baru.
- Discord Bot Token.
- API Google AI Studio.
- FFmpeg.
- Docker.
- MongoDB Atlas Url Database.

## Installasi

1.  **Clone Repository**
    ```bash
    git clone <repository-url>
    cd Gobernante
    ```
2.  **Install Semua Dependensi**
    ```bash
    npm install
    npm i --save-dev @types/yt-search
    ```
3.  **Buat file `.env` di dalam root folder **

    ```env
    DISCORD_TOKEN=<DISCORD_BOT_TOKEN>
    CLIENT_ID=<DISCORD_CLIENT_ID>
    GEMINI_API_KEY=<API_KEY>
    DATABASE_URL=<mongodb_url>
    OWNER_ID=<DISCORD_OWNER_ID>
    ```

4.  **Udah deh jalankan bot**
    ```bash
    npm run start
    ```

## Menjalankan lewat docker

1.  **Clone Repository**
    ```bash
    git clone <repository-url>
    cd Gobernante
    ```
2.  Buat file `.env` di dalam root folder \*\*

    ```env
    DISCORD_TOKEN=<DISCORD_BOT_TOKEN>
    CLIENT_ID=<DISCORD_CLIENT_ID>
    GEMINI_API_KEY=<API_KEY>
    DATABASE_URL=<mongodb_url>
    OWNER_ID=<DISCORD_OWNER_ID>
    ```

3.  **Udah deh jalankan bot**

    ```bash
    docker build -t <nama_image> .
    docker run --name <nama_container> --restart unless-stopped -d <nama_image>
    ```

    **Catatan:**

    - Ganti `<nama_image>` dengan nama image yang diinginkan.
    - Ganti `<nama_container>` dengan nama container yang diinginkan.
    - Ganti `<DISCORD_BOT_TOKEN>` dengan token bot Discord Anda.
    - Ganti `<DISCORD_CLIENT_ID>` dengan ID bot Discord Anda.
    - Ganti `<API_KEY>` dengan API key AI Studio Anda.
    - Ganti `<mongodb_url>` dengan URL database MongoDB Atlas Anda.

## Terakhir

Kalo mau pake pake aja ges jangan lupa star di github ya kak, sama saran gw jalanin pake docker aja biar bisa running terus apalagi kalau kalian pake linux, okay tq bye!!
