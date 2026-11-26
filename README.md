# NUSA DATA — Portal Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Booganteng/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Booganteng/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Angka-angka resmi Indonesia dalam satu portal yang mudah dibaca: penduduk, ekonomi, perdagangan, dan provinsi — lengkap dengan sumber dan tahun. Lima halaman (Beranda, Penduduk, Ekonomi, Provinsi, Sumber &amp; Metode), grafik SVG yang digambar dari data halaman itu sendiri, tabel provinsi dengan pencarian langsung, dan tampilan telepon.

## Run it

```sh
node serve.ts
```

Lalu buka http://localhost:8080. Situs ini file statis di bawah `app/` — tanpa build step, tanpa permintaan jaringan. `main.ts` menyalin `app/` dan `screenshots/` ke direktori output dan menulis `dossier.json` di sana:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=zkz6chz4&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
