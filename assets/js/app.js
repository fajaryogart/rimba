(function () {
  var P = window.RIMBA_PRODUK, K = window.RIMBA_KATEGORI, rp = window.rupiah;
  var IMG = 'assets/images/';
  var halaman = document.body.getAttribute('data-halaman');

  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Penyimpanan (aman bila diblokir) ---------- */
  function baca(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function simpan(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- Toast ---------- */
  var toast = $('#toast'), tt;
  function kabar(teks) {
    if (!toast) return;
    toast.textContent = teks; toast.classList.add('tampil');
    clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('tampil'); }, 2600);
  }
  window.kabar = kabar;

  /* ---------- Mega menu ---------- */
  $$('.menu > li > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement, buka = !li.classList.contains('buka');
      $$('.menu > li.buka').forEach(function (x) { x.classList.remove('buka'); x.firstElementChild.setAttribute('aria-expanded', 'false'); });
      li.classList.toggle('buka', buka); btn.setAttribute('aria-expanded', String(buka));
    });
  });
  $$('.menu > li').forEach(function (li) {
    li.addEventListener('mouseleave', function () { li.classList.remove('buka'); if (li.firstElementChild.tagName === 'BUTTON') li.firstElementChild.setAttribute('aria-expanded', 'false'); });
  });

  /* ---------- Pencarian ---------- */
  var tCari = $('#tombol-cari'), cari = $('#cari');
  if (tCari) tCari.addEventListener('click', function () {
    var buka = cari.classList.toggle('buka'); tCari.setAttribute('aria-expanded', String(buka));
    if (buka) $('#input-cari').focus();
  });

  /* ---------- Menu mobile ---------- */
  var drawer = $('#drawer'), bukaMenu = $('#buka-menu');
  function tutupDrawer() { if (!drawer) return; drawer.classList.remove('buka'); drawer.setAttribute('aria-hidden', 'true'); bukaMenu.setAttribute('aria-expanded', 'false'); kunci(); }
  if (bukaMenu) bukaMenu.addEventListener('click', function () { drawer.classList.add('buka'); drawer.setAttribute('aria-hidden', 'false'); bukaMenu.setAttribute('aria-expanded', 'true'); kunci(); });
  if (drawer) $$('[data-tutup]', drawer).forEach(function (el) { el.addEventListener('click', tutupDrawer); });

  function kunci() {
    var adaBuka = (drawer && drawer.classList.contains('buka')) || (panelK && panelK.classList.contains('buka'));
    document.body.classList.toggle('kunci', !!adaBuka);
  }

  /* ---------- Favorit ---------- */
  var favorit = baca('rimba-favorit', []);
  function isFav(id) { return favorit.indexOf(id) > -1; }
  function toggleFav(id) {
    if (isFav(id)) favorit = favorit.filter(function (x) { return x !== id; }); else favorit.push(id);
    simpan('rimba-favorit', favorit);
    $$('[data-fav="' + id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', String(isFav(id))); });
    kabar(isFav(id) ? 'Disimpan ke favorit' : 'Dihapus dari favorit');
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fav]'); if (!b) return;
    e.preventDefault(); toggleFav(b.getAttribute('data-fav'));
  });

  /* ---------- Keranjang ---------- */
  var keranjang = baca('rimba-keranjang', []);
  var panelK = $('#keranjang'), BATAS_ONGKIR = 750000;
  function total() { return keranjang.reduce(function (s, it) { var p = window.cariProduk(it.id); return s + (p ? p.harga * it.qty : 0); }, 0); }
  function jumlahItem() { return keranjang.reduce(function (s, it) { return s + it.qty; }, 0); }
  function gambarKeranjang() {
    var n = jumlahItem(), badge = $('#jumlah-keranjang');
    if (badge) { badge.textContent = n; badge.hidden = n === 0; }
    if (!panelK) return;
    var daftar = $('#k-daftar'), t = total(), sisa = BATAS_ONGKIR - t;
    $('#k-ongkir-teks').innerHTML = t === 0 ? 'Gratis ongkir untuk belanja di atas <b>' + rp(BATAS_ONGKIR) + '</b>'
      : sisa > 0 ? 'Tambah <b>' + rp(sisa) + '</b> lagi untuk gratis ongkir' : '<b>Kamu dapat gratis ongkir!</b>';
    $('#k-bar').style.width = Math.min(100, t / BATAS_ONGKIR * 100) + '%';
    $('#k-total').textContent = rp(t);
    $('#k-bawah').hidden = keranjang.length === 0;
    if (!keranjang.length) {
      daftar.innerHTML = '<li class="k-kosong"><p>Keranjangmu masih kosong.</p><a class="btn btn-gelap" href="koleksi.html">Mulai belanja</a></li>';
      return;
    }
    daftar.innerHTML = keranjang.map(function (it, i) {
      var p = window.cariProduk(it.id); if (!p) return '';
      return '<li class="k-item">' +
        '<a href="produk.html?id=' + p.id + '"><img src="' + IMG + window.fotoWarna(p, it.warna)[0] + '" alt=""></a>' +
        '<div><h3><a href="produk.html?id=' + p.id + '">' + esc(p.nama) + '</a></h3>' +
        '<p class="var">' + esc(it.warna) + ' · ' + esc(it.ukuran) + '</p>' +
        '<div class="qty"><button type="button" data-k-kurang="' + i + '" aria-label="Kurangi">−</button><span>' + it.qty + '</span><button type="button" data-k-tambah="' + i + '" aria-label="Tambah">+</button></div></div>' +
        '<div class="k-harga">' + rp(p.harga * it.qty) + '<button type="button" class="hapus" data-k-hapus="' + i + '">Hapus</button></div></li>';
    }).join('');
  }
  function bukaKeranjang() { panelK.classList.add('buka'); panelK.setAttribute('aria-hidden', 'false'); kunci(); setTimeout(function () { $('.k-atas button', panelK).focus(); }, 50); }
  function tutupKeranjang() { panelK.classList.remove('buka'); panelK.setAttribute('aria-hidden', 'true'); kunci(); }
  function tambahKeKeranjang(id, warna, ukuran, qty) {
    var ada = keranjang.find(function (x) { return x.id === id && x.warna === warna && x.ukuran === ukuran; });
    if (ada) ada.qty += qty; else keranjang.push({ id: id, warna: warna, ukuran: ukuran, qty: qty });
    simpan('rimba-keranjang', keranjang); gambarKeranjang(); bukaKeranjang();
  }
  window.tambahKeKeranjang = tambahKeKeranjang;
  if (panelK) {
    $('#tombol-keranjang').addEventListener('click', bukaKeranjang);
    $$('[data-tutup-k]', panelK).forEach(function (el) { el.addEventListener('click', tutupKeranjang); });
    panelK.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var i;
      if ((i = b.getAttribute('data-k-tambah')) !== null) keranjang[i].qty++;
      else if ((i = b.getAttribute('data-k-kurang')) !== null) { keranjang[i].qty--; if (keranjang[i].qty < 1) keranjang.splice(i, 1); }
      else if ((i = b.getAttribute('data-k-hapus')) !== null) keranjang.splice(i, 1);
      else return;
      simpan('rimba-keranjang', keranjang); gambarKeranjang();
    });
    $('#k-checkout').addEventListener('click', function () { kabar('Ini website demo untuk tugas kuliah, checkout belum aktif.'); });
  }
  gambarKeranjang();

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    $$('.menu > li.buka').forEach(function (x) { x.classList.remove('buka'); });
    tutupDrawer(); if (panelK && panelK.classList.contains('buka')) tutupKeranjang();
  });

  /* ---------- Kartu produk ---------- */
  var ikonHati = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>';
  function kartu(p) {
    var badge = p.badge ? '<span class="badge' + (p.badge === 'Baru' ? ' oranye' : '') + '">' + esc(p.badge) + '</span>' : '';
    return '<article class="produk">' +
      '<div class="produk-foto"><img src="' + IMG + p.warna[0].foto[0] + '" data-asli="' + IMG + p.warna[0].foto[0] + '" alt="' + esc(p.nama) + '" loading="lazy">' + badge +
      '<button class="suka" type="button" data-fav="' + p.id + '" aria-pressed="' + isFav(p.id) + '" aria-label="Simpan ' + esc(p.nama) + '">' + ikonHati + '</button></div>' +
      '<div class="produk-isi"><div class="warna" aria-label="' + p.warna.length + ' pilihan warna">' +
      p.warna.map(function (w, i) { return '<i style="background:' + w.hex + '" title="' + esc(w.nama) + '" data-img="' + IMG + w.foto[0] + '" data-href="produk.html?id=' + p.id + (i ? '&warna=' + i : '') + '"></i>'; }).join('') + '</div>' +
      '<h3><a href="produk.html?id=' + p.id + '">' + esc(p.nama) + '</a></h3>' +
      '<p class="produk-kat">' + esc(p.sub) + '</p><p class="harga">' + rp(p.harga) + '</p></div></article>';
  }
  function urutRekomendasi(a, b) { return a.urutan - b.urutan; }

  // Arahkan kursor ke titik warna di kartu: foto ikut berganti
  document.addEventListener('mouseover', function (e) {
    var i = e.target.closest('.produk .warna i'); if (!i) return;
    var img = i.closest('.produk').querySelector('.produk-foto img'); img.src = i.getAttribute('data-img');
  });
  document.addEventListener('click', function (e) {
    var i = e.target.closest('.produk .warna i'); if (i) location.href = i.getAttribute('data-href');
  });
  document.addEventListener('mouseout', function (e) {
    var card = e.target.closest('.produk'); if (!card || card.contains(e.relatedTarget)) return;
    var img = card.querySelector('.produk-foto img'); if (img && img.getAttribute('data-asli')) img.src = img.getAttribute('data-asli');
  });

  /* ---------- Beranda ---------- */
  if (halaman === 'beranda') {
    var rel = $('#rel');
    rel.innerHTML = P.slice().sort(urutRekomendasi).map(kartu).join('');
    var kiri = $('#rel-kiri'), kanan = $('#rel-kanan');
    function langkah() { var c = rel.querySelector('.produk'); return c ? c.getBoundingClientRect().width + 16 : 300; }
    function cekRel() { kiri.disabled = rel.scrollLeft < 4; kanan.disabled = rel.scrollLeft + rel.clientWidth >= rel.scrollWidth - 4; }
    kiri.addEventListener('click', function () { rel.scrollBy({ left: -langkah(), behavior: 'smooth' }); });
    kanan.addEventListener('click', function () { rel.scrollBy({ left: langkah(), behavior: 'smooth' }); });
    rel.addEventListener('scroll', cekRel, { passive: true }); window.addEventListener('resize', cekRel); cekRel();

    var form = $('#form-email'), input = $('#email'), pesan = $('#form-pesan');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { pesan.textContent = 'Format email belum benar. Contoh: nama@email.com'; input.focus(); return; }
      pesan.textContent = 'Terima kasih! ' + val + ' sudah masuk daftar Kabar Jalur.'; form.reset();
    });
  }

  /* ---------- Koleksi ---------- */
  if (halaman === 'koleksi') {
    var q = new URLSearchParams(location.search);
    var kat = K[q.get('kat')] ? q.get('kat') : 'semua';
    var kata = (q.get('q') || '').trim().toLowerCase();
    var urut = 'rekomendasi';
    var chipBox = $('#chip'), grid = $('#grid-koleksi');
    chipBox.innerHTML = ['semua'].concat(Object.keys(K)).map(function (k) {
      return '<button type="button" class="chip" data-kat="' + k + '">' + (k === 'semua' ? 'Semua' : K[k].nama) + '</button>';
    }).join('');
    function render() {
      $$('.chip', chipBox).forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-kat') === kat)); });
      var info = K[kat];
      $('#koleksi-judul').textContent = kata ? 'Hasil: “' + kata + '”' : info ? info.judul : 'Semua Produk';
      $('#koleksi-desk').textContent = kata ? '' : info ? info.desk : 'Perlengkapan outdoor untuk jalur tropis Indonesia.';
      $('#remah-akhir').textContent = info ? info.nama : 'Semua Produk';
      document.title = (info ? info.nama : 'Semua Produk') + ' | RIMBA';
      var daftar = P.filter(function (p) {
        return (kat === 'semua' || p.kategori === kat) &&
          (!kata || (p.nama + ' ' + p.sub + ' ' + K[p.kategori].nama).toLowerCase().indexOf(kata) > -1);
      });
      daftar.sort(urut === 'murah' ? function (a, b) { return a.harga - b.harga; } : urut === 'mahal' ? function (a, b) { return b.harga - a.harga; } : urutRekomendasi);
      $('#jumlah-hasil').textContent = daftar.length + ' produk';
      grid.innerHTML = daftar.length ? daftar.map(kartu).join('') : '<p style="grid-column:1/-1;color:var(--teks-2)">Produk tidak ditemukan. Coba kata lain atau pilih kategori.</p>';
    }
    chipBox.addEventListener('click', function (e) {
      var c = e.target.closest('.chip'); if (!c) return;
      kat = c.getAttribute('data-kat'); kata = '';
      history.replaceState(null, '', kat === 'semua' ? 'koleksi.html' : 'koleksi.html?kat=' + kat);
      render();
    });
    $('#urut').addEventListener('change', function (e) { urut = e.target.value; render(); });
    render();
  }

  /* ---------- Detail produk ---------- */
  if (halaman === 'produk') {
    var id = new URLSearchParams(location.search).get('id');
    var p = window.cariProduk(id) || null;
    var wadah = $('#pdp');
    if (!p) {
      wadah.innerHTML = '<div class="kosong"><h1 class="judul">Produk tidak ditemukan</h1><p>Mungkin tautannya salah atau produknya sudah tidak dijual.</p><a class="btn btn-gelap" href="koleksi.html">Lihat semua produk</a></div>';
      return;
    }
    document.title = p.nama + ' | RIMBA';
    var qWarna = +new URLSearchParams(location.search).get('warna') || 0;
    var idx = 0, warna = (p.warna[qWarna] || p.warna[0]).nama, foto = window.fotoWarna(p, warna), ukuran = p.ukuran.length === 1 ? p.ukuran[0] : null, qty = 1;
    var satuUkuran = p.ukuran.length === 1;
    var ikonPanah = function (d) { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="' + d + '"/></svg>'; };
    wadah.innerHTML =
      '<ol class="remah" style="padding-top:0;grid-column:1/-1"><li><a href="index.html">Beranda</a></li><li><a href="koleksi.html?kat=' + p.kategori + '">' + esc(K[p.kategori].nama) + '</a></li><li>' + esc(p.nama) + '</li></ol>' +
      '<div class="galeri">' +
        '<div class="thumb" id="thumb" role="group" aria-label="Pilih foto"></div>' +
        '<div class="galeri-utama">' + (p.badge ? '<span class="badge' + (p.badge === 'Baru' ? ' oranye' : '') + '">' + esc(p.badge) + '</span>' : '') +
          '<img id="foto-utama" src="' + IMG + foto[0] + '" alt="' + esc(p.nama) + '">' +
          '<button class="galeri-nav kiri" type="button" data-geser="-1" aria-label="Foto sebelumnya">' + ikonPanah('M15 6l-6 6 6 6') + '</button><button class="galeri-nav kanan" type="button" data-geser="1" aria-label="Foto berikutnya">' + ikonPanah('M9 6l6 6-6 6') + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="info">' +
        '<p class="eyebrow">' + esc(K[p.kategori].nama) + '</p>' +
        '<h1 class="judul">' + esc(p.nama) + '</h1>' +
        '<p class="sub">' + esc(p.sub) + '</p>' +
        '<p class="harga-besar">' + rp(p.harga) + '</p>' +
        '<div class="opsi"><div class="opsi-label"><span>Warna: <b id="nama-warna">' + esc(warna) + '</b></span></div><div class="swatch-baris">' +
          p.warna.map(function (w) { return '<button type="button" class="swatch" style="background:' + w.hex + '" data-warna="' + esc(w.nama) + '" aria-pressed="' + (w.nama === warna) + '" aria-label="' + esc(w.nama) + '"></button>'; }).join('') +
        '</div></div>' +
        '<div class="opsi"><div class="opsi-label"><span>' + (satuUkuran ? 'Ukuran' : 'Pilih ukuran') + '</span>' + (p.kategori === 'sepatu' || p.kategori === 'pakaian' ? '<a href="#akordion-ukuran">Panduan ukuran</a>' : '') + '</div><div class="ukuran-grid" id="ukuran-grid">' +
          p.ukuran.map(function (u) { var h = p.habis.indexOf(u) > -1; return '<button type="button" data-ukuran="' + u + '" aria-pressed="' + (satuUkuran) + '"' + (h ? ' disabled aria-label="' + u + ' (habis)"' : '') + '>' + u + '</button>'; }).join('') +
        '</div><p class="pesan-ukuran" id="pesan-ukuran" aria-live="polite"></p></div>' +
        '<div class="beli"><div class="qty" aria-label="Jumlah"><button type="button" id="qty-kurang" aria-label="Kurangi jumlah">−</button><span id="qty">1</span><button type="button" id="qty-tambah" aria-label="Tambah jumlah">+</button></div>' +
          '<button type="button" class="btn btn-oranye" id="beli">Masukkan ke keranjang</button>' +
          '<button type="button" class="suka-besar" data-fav="' + p.id + '" aria-pressed="' + isFav(p.id) + '" aria-label="Simpan ke favorit">' + ikonHati + '</button></div>' +
        '<ul class="janji">' +
          '<li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>Gratis ongkir untuk belanja di atas ' + rp(750000) + '</li>' +
          '<li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v4h4"/></svg>Retur gratis dalam 30 hari</li>' +
        '</ul>' +
        '<div class="akordion">' +
          '<details open><summary>Deskripsi</summary><div class="isi">' + p.deskripsi.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '<ul>' + p.fitur.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></details>' +
          '<details><summary>Spesifikasi</summary><div class="isi"><table class="tabel-spek"><tbody>' + p.spek.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</tbody></table></div></details>' +
          '<details id="akordion-ukuran"><summary>Ukuran</summary><div class="isi"><p>' + esc(p.catatanUkuran) + '</p></div></details>' +
          '<details><summary>Pengiriman & retur</summary><div class="isi"><p>Dikirim 1–2 hari kerja dari gudang Jakarta. Retur gratis dalam 30 hari selama produk belum dipakai di jalur.</p></div></details>' +
        '</div>' +
      '</div>';

    var fotoUtama = $('#foto-utama');
    function renderThumb() {
      $('#thumb').innerHTML = foto.map(function (f, i) { return '<button type="button" data-foto="' + i + '" aria-label="Foto ' + (i + 1) + '"><img src="' + IMG + f + '" alt=""></button>'; }).join('');
      $$('.galeri-nav').forEach(function (b) { b.hidden = foto.length < 2; });
    }
    function setFoto(i) {
      idx = (i + foto.length) % foto.length;
      fotoUtama.src = IMG + foto[idx];
      fotoUtama.alt = p.nama + ' warna ' + warna;
      $$('[data-foto]').forEach(function (b) { b.setAttribute('aria-current', String(+b.getAttribute('data-foto') === idx)); });
    }
    renderThumb(); setFoto(0);
    wadah.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-foto')) setFoto(+b.getAttribute('data-foto'));
      else if (b.hasAttribute('data-geser')) setFoto(idx + +b.getAttribute('data-geser'));
      else if (b.hasAttribute('data-warna')) {
        warna = b.getAttribute('data-warna');
        $$('[data-warna]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        $('#nama-warna').textContent = warna;
        foto = window.fotoWarna(p, warna); renderThumb(); setFoto(0);
      } else if (b.hasAttribute('data-ukuran')) {
        ukuran = b.getAttribute('data-ukuran');
        $$('[data-ukuran]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        $('#pesan-ukuran').textContent = '';
      } else if (b.id === 'qty-tambah') { qty = Math.min(10, qty + 1); $('#qty').textContent = qty; }
      else if (b.id === 'qty-kurang') { qty = Math.max(1, qty - 1); $('#qty').textContent = qty; }
      else if (b.id === 'beli') {
        if (!ukuran) { $('#pesan-ukuran').textContent = 'Pilih ukuran dulu ya.'; $('#ukuran-grid button:not(:disabled)').focus(); return; }
        tambahKeKeranjang(p.id, warna, ukuran, qty);
      }
    });

    var lain = P.filter(function (x) { return x.id !== p.id; }).sort(function (a, b) { return (b.kategori === p.kategori) - (a.kategori === p.kategori) || a.urutan - b.urutan; }).slice(0, 4);
    $('#terkait').innerHTML = lain.map(kartu).join('');
  }
})();
