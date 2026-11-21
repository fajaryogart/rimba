/* Data produk RIMBA (brand fiktif, harga & spesifikasi hanya contoh) */
window.RIMBA_KATEGORI = {
  sepatu: { nama: 'Sepatu', judul: 'Sepatu Hiking & Trail', desk: 'Sol bergerigi untuk tanah becek, akar licin, dan turunan berbatu.' },
  pakaian: { nama: 'Pakaian', judul: 'Pakaian Outdoor', desk: 'Ringan dibawa, cepat kering, siap untuk hujan yang datang tiba-tiba.' },
  tas: { nama: 'Tas & Carrier', judul: 'Tas & Carrier', desk: 'Punggung tetap adem, barang tetap kering sampai di puncak.' },
  tenda: { nama: 'Tenda', judul: 'Tenda & Berkemah', desk: 'Tempat tidur yang bisa diandalkan di atas gunung.' }
};

window.RIMBA_PRODUK = [
  {
    id: 'xpdic-2-mid',
    nama: 'RIMBA XPDIC 2 Mid',
    kategori: 'sepatu',
    sub: 'Sepatu hiking mid-cut · Unisex',
    harga: 1249000,
    badge: 'Baru',
    urutan: 1,
    foto: ['produk-xpdic-mid.jpg', 'xpdic2.jpg'],
    warna: [
      { nama: 'Abu Batu', hex: '#5A5F5C' },
      { nama: 'Hijau Hutan', hex: '#135D46' },
      { nama: 'Cokelat Tanah', hex: '#8A5A35' }
    ],
    ukuran: ['39', '40', '41', '42', '43', '44', '45'],
    habis: ['45'],
    catatanUkuran: 'Kalau ragu, ambil satu nomor lebih besar untuk kaos kaki tebal.',
    deskripsi: [
      'Nama XPDIC diambil dari kata expedition. Generasi kedua ini dibuat untuk satu tujuan: kaki tetap kering dan tidak tergelincir, bahkan di turunan yang masih basah sisa hujan semalam.',
      'Potongan mid-cut menjaga pergelangan kaki tetap stabil saat membawa carrier berat.'
    ],
    fitur: ['Gerigi sol karet 5 mm untuk tanah lunak dan lumpur', 'Mesh rapat, cepat kering, kerikil kecil tidak gampang masuk', 'Tali hijau stabilo, gampang dicek saat gelap', 'Pelindung ujung kaki dari karet'],
    spek: [['Berat', '412 g per sepatu (ukuran 42)'], ['Upper', 'Mesh rapat + overlay sintetis'], ['Sol', 'Karet, gerigi 5 mm'], ['Tinggi', 'Mid-cut'], ['Cocok untuk', 'Pendakian harian & multi-hari']]
  },
  {
    id: 'xpdic-2-low',
    nama: 'RIMBA XPDIC 2 Low',
    kategori: 'sepatu',
    sub: 'Sepatu trail low-cut · Unisex',
    harga: 1099000,
    badge: 'Segera',
    urutan: 5,
    foto: ['produk-xpdic-low.jpg', 'xpdic-low-pasang.jpg'],
    warna: [{ nama: 'Abu Batu', hex: '#5A5F5C' }],
    ukuran: ['39', '40', '41', '42', '43', '44'],
    habis: [],
    catatanUkuran: 'Ukuran pas di kaki. Pilih ukuran yang biasa kamu pakai.',
    deskripsi: [
      'Versi low-cut dari XPDIC 2 untuk jalur yang lebih cepat: trail run pagi, tektok, atau jalan santai ke air terjun.',
      'Lebih ringan, lebih lentur, dengan sol yang sama menggigitnya.'
    ],
    fitur: ['Sol karet bergerigi dari keluarga XPDIC', 'Upper mesh yang bernapas', 'Loop tumit untuk dipakai cepat'],
    spek: [['Berat', '338 g per sepatu (ukuran 42)'], ['Upper', 'Mesh + overlay sintetis'], ['Sol', 'Karet, gerigi 4 mm'], ['Tinggi', 'Low-cut'], ['Cocok untuk', 'Trail run & pendakian ringan']]
  },
  {
    id: 'jaket-kabut',
    nama: 'Jaket Kabut',
    kategori: 'pakaian',
    sub: 'Jaket 2 lapis · Tahan gerimis',
    harga: 899000,
    urutan: 2,
    foto: ['produk-jaket.jpg', 'jacket.jpg', 'jaket-lipat.jpg'],
    warna: [
      { nama: 'Cokelat Tanah', hex: '#4E4741' },
      { nama: 'Hijau Hutan', hex: '#0C3A2C' }
    ],
    ukuran: ['S', 'M', 'L', 'XL'],
    habis: [],
    catatanUkuran: 'Potongan regular. Masih muat dipakai di atas fleece tipis.',
    deskripsi: [
      'Jaket dua lapis yang menahan gerimis dan angin di punggungan gunung.',
      'Bisa dilipat masuk ke saku dadanya sendiri, jadi tidak makan tempat di carrier.'
    ],
    fitur: ['Lapisan luar tahan air ringan (water-repellent)', 'Hoodie dengan tali pengencang', 'Ritsleting oranye, gampang terlihat', 'Bisa dilipat ke saku sendiri'],
    spek: [['Berat', '290 g (ukuran M)'], ['Bahan', 'Nylon ripstop 2 lapis'], ['Saku', '2 saku tangan + 1 saku dada'], ['Perawatan', 'Cuci tangan, jangan diperas']]
  },
  {
    id: 'carrier-lembah-45',
    nama: 'Carrier Lembah 45L',
    kategori: 'tas',
    sub: 'Tas carrier 45 liter · Cover hujan bawaan',
    harga: 1149000,
    badge: 'Terlaris',
    urutan: 3,
    foto: ['produk-carrier.jpg', 'carrier-belakang.jpg', 'kat-carrier.jpg'],
    warna: [
      { nama: 'Hijau Hutan', hex: '#135D46' },
      { nama: 'Hitam Arang', hex: '#2B2B2B' }
    ],
    ukuran: ['45L'],
    habis: [],
    catatanUkuran: 'Satu ukuran, panjang punggung bisa disetel 42–52 cm.',
    deskripsi: [
      'Carrier 45 liter untuk pendakian dua sampai tiga hari.',
      'Punggungnya berongga supaya tidak gerah, dan cover hujan sudah tersimpan di kantong bawah.'
    ],
    fitur: ['Panel punggung mesh berongga', 'Hip belt empuk dengan dua saku', 'Cover hujan bawaan', 'Akses samping ke kompartemen utama'],
    spek: [['Kapasitas', '45 liter'], ['Berat', '1,35 kg'], ['Bahan', 'Polyester ripstop 420D'], ['Panjang punggung', '42–52 cm (bisa disetel)']]
  },
  {
    id: 'tenda-ranu-2p',
    nama: 'Tenda Ranu 2P',
    kategori: 'tenda',
    sub: 'Tenda 2 orang · Berdiri 6 menit',
    harga: 1689000,
    urutan: 4,
    foto: ['produk-tenda.jpg', 'tenda-dalam.jpg', 'kat-tenda.jpg'],
    warna: [
      { nama: 'Oranye Api', hex: '#E8692A' },
      { nama: 'Hijau Hutan', hex: '#135D46' }
    ],
    ukuran: ['2 orang'],
    habis: [],
    catatanUkuran: 'Muat dua orang dewasa dengan ruang depan untuk sepatu dan carrier.',
    deskripsi: [
      'Tenda dome dua orang yang bisa didirikan sendirian dalam sekitar enam menit.',
      'Dinding dalam dari mesh supaya tidak pengap, dengan flysheet yang menahan hujan semalaman.'
    ],
    fitur: ['Frame aluminium 2 tiang', 'Inner mesh, sirkulasi udara bagus', 'Flysheet dengan lapisan PU', 'Dua pintu & dua ruang depan'],
    spek: [['Kapasitas', '2 orang'], ['Berat', '2,1 kg'], ['Ukuran lantai', '210 × 140 cm'], ['Tinggi', '110 cm'], ['Flysheet', 'Polyester 68D, PU 3000 mm']]
  }
];

window.rupiah = function (n) { return 'Rp' + n.toLocaleString('id-ID'); };
window.cariProduk = function (id) { return window.RIMBA_PRODUK.find(function (p) { return p.id === id; }); };
