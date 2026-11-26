// All figures on this site, each with its source and year. Figures are compiled
// from the public releases of Badan Pusat Statistik (BPS), Bank Dunia (World Bank)
// and APJII. Values are shown exactly as published; nothing here is estimated
// by this site.
window.NUSA_DATA = {
  updated: '26 November 2026',
  indicators: [
    { id: 'penduduk', label: 'Penduduk', value: '281,6 jt', note: 'jiwa, 2024', source: 'BPS' },
    { id: 'pdb', label: 'PDB', value: 'Rp20.892 T', note: 'harga berlaku, 2024', source: 'BPS' },
    { id: 'pdb-kapita', label: 'PDB per Kapita', value: 'US$4.925', note: '2024', source: 'Bank Dunia' },
    { id: 'tumbuh', label: 'Pertumbuhan Ekonomi', value: '5,03%', note: 'y-on-y, 2024', source: 'BPS' },
    { id: 'tpt', label: 'Tingkat Pengangguran', value: '4,76%', note: 'Agustus 2024', source: 'BPS' },
    { id: 'miskin', label: 'Penduduk Miskin', value: '8,57%', note: 'September 2024', source: 'BPS' },
  ],
  // Pertumbuhan ekonomi tahunan, persen (BPS).
  gdpGrowth: [
    { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
    { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
    { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
    { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
  ],
  // Jumlah penduduk, juta jiwa, estimasi pertengahan tahun (BPS).
  population: [
    { year: 2015, value: 255.6 }, { year: 2016, value: 258.7 },
    { year: 2017, value: 261.9 }, { year: 2018, value: 265.0 },
    { year: 2019, value: 268.1 }, { year: 2020, value: 270.2 },
    { year: 2021, value: 272.2 }, { year: 2022, value: 275.8 },
    { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 },
  ],
  // PDB menurut lapangan usaha 2024, persen dari total (BPS).
  sectors: [
    { name: 'Industri Pengolahan', value: 18.7 },
    { name: 'Perdagangan', value: 12.9 },
    { name: 'Pertanian', value: 11.9 },
    { name: 'Konstruksi', value: 9.8 },
    { name: 'Pertambangan', value: 9.0 },
    { name: 'Lapangan usaha lainnya', value: 37.7 },
  ],
  // Perdagangan luar negeri 2024, miliar dolar AS (BPS).
  trade: [
    { id: 'ekspor', label: 'Ekspor', value: 'US$264,7 M', note: '2024' },
    { id: 'impor', label: 'Impor', value: 'US$233,7 M', note: '2024' },
    { id: 'surplus', label: 'Surplus Neraca', value: 'US$31,0 M', note: '2024' },
  ],
  // Sepuluh provinsi berpenduduk terbesar, 2024 (BPS). Luas dalam km², kepadatan jiwa/km².
  provinces: [
    { name: 'Jawa Barat', pop: 49.9, area: 35378, density: 1410 },
    { name: 'Jawa Timur', pop: 41.8, area: 47803, density: 874 },
    { name: 'Jawa Tengah', pop: 37.9, area: 32800, density: 1155 },
    { name: 'Sumatera Utara', pop: 15.6, area: 72981, density: 214 },
    { name: 'Banten', pop: 12.4, area: 9663, density: 1283 },
    { name: 'DKI Jakarta', pop: 10.6, area: 661, density: 16036 },
    { name: 'Sulawesi Selatan', pop: 9.5, area: 46717, density: 203 },
    { name: 'Lampung', pop: 9.3, area: 34623, density: 269 },
    { name: 'Sumatera Selatan', pop: 8.9, area: 91592, density: 97 },
    { name: 'Riau', pop: 6.9, area: 87023, density: 79 },
  ],
  // Struktur umur penduduk 2024, persen (BPS).
  ageStructure: [
    { group: '0–14 tahun', value: 24.0 },
    { group: '15–64 tahun', value: 68.9 },
    { group: '65 tahun ke atas', value: 7.1 },
  ],
  people: [
    { label: 'Harapan Hidup', value: '73,8 tahun', note: '2023', source: 'BPS' },
    { label: 'Indeks Pembangunan Manusia', value: '75,02', note: '2024', source: 'BPS' },
    { label: 'Melek Huruf (15+)', value: '96,1%', note: '2023', source: 'BPS' },
    { label: 'Rata-rata Lama Sekolah', value: '9,1 tahun', note: '2023', source: 'BPS' },
    { label: 'Penduduk Perkotaan', value: '58,6%', note: '2024', source: 'BPS' },
    { label: 'Pengguna Internet', value: '221,6 jt', note: '2024', source: 'APJII' },
    { label: 'Rasio Gini', value: '0,381', note: 'September 2024', source: 'BPS' },
    { label: 'Inflasi', value: '1,57%', note: 'y-on-y, 2024', source: 'BPS' },
    { label: 'Angkatan Kerja', value: '152,1 jt', note: 'Agustus 2024', source: 'BPS' },
  ],
  releases: [
    { date: '5 Nov 2026', title: 'Pertumbuhan Ekonomi Indonesia Triwulan III-2026', source: 'BPS' },
    { date: '3 Nov 2026', title: 'Inflasi Oktober 2026 dan Perkembangan Ekspor-Impor', source: 'BPS' },
    { date: '15 Okt 2026', title: 'Tingkat Pengangguran Terbuka Agustus 2026', source: 'BPS' },
    { date: '1 Okt 2026', title: 'Profil Kemiskinan di Indonesia September 2026', source: 'BPS' },
    { date: '15 Sep 2026', title: 'Indeks Pembangunan Manusia 2025', source: 'BPS' },
  ],
};
