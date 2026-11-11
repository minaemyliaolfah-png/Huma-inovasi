# Ruang Inovasi

Website portofolio Mina Emylia Olfah yang dapat langsung diunggah ke GitHub Pages. HTML, CSS, JavaScript, konfigurasi, dan backend dipisahkan agar mudah dirawat. Tidak memerlukan proses build atau pemasangan paket.

## Struktur file

```text
index.html                 Struktur halaman dan navigasi utama
config.js                  Alamat layanan Apps Script
.nojekyll                  Pengaturan situs statis GitHub Pages
assets/
  css/styles.css           Warna, font, ukuran, jarak, dan tampilan responsif
  js/content.js            Konten awal untuk demo lokal
  js/api.js                Komunikasi server dan mode demo
  js/app.js                Tampilan halaman, formulir, dan interaksi
  images/                  Tempat foto atau gambar tambahan
apps-script/
  Code.gs                  Backend yang ditempel ke Apps Script
MULAI-DI-SINI.md            Panduan pemasangan
README.md                  Petunjuk struktur dan penyuntingan
```

## Mengubah website

| Yang ingin diubah | Tempat mengubah |
| --- | --- |
| URL backend | `apiUrl` dalam `config.js` |
| Warna dan font | Bagian `:root` dan `body` dalam `assets/css/styles.css` |
| Ukuran kartu, jarak, tampilan HP | `assets/css/styles.css` |
| Navigasi, judul tab awal, footer | `index.html` |
| Isi program, bukti, profil, pengantar beranda | Admin pada website yang terhubung |
| Susunan halaman dan formulir | `assets/js/app.js` |
| Cara aplikasi mengirim atau membaca data | `assets/js/api.js` |
| Deskripsi contoh pada pratinjau lokal | `assets/js/content.js` |
| Validasi, login, penyimpanan Sheets | `apps-script/Code.gs` |

Setelah aplikasi terhubung, isi yang ditampilkan berasal dari Spreadsheet. Perubahan pada `content.js` berlaku untuk demo lokal. Untuk isi produksi, gunakan Admin. Data awal untuk Spreadsheet baru berada pada konstanta `SEED` di `apps-script/Code.gs`. Menjalankan `setup` kembali mempertahankan data yang sudah ada.

Untuk menggunakan gambar dari repository, unggah gambar ke `assets/images/`, lalu gunakan URL HTTPS lengkap gambar tersebut sebagai foto sampul pada Admin. Contoh pola alamatnya adalah `https://NAMA-AKUN.github.io/NAMA-REPOSITORY/assets/images/foto-kegiatan.jpg`.

Semua referensi file website memakai alamat relatif agar dapat berjalan pada alamat repository GitHub Pages. Pertahankan urutan script di HTML.

Mulai pemasangan dari [MULAI-DI-SINI.md](MULAI-DI-SINI.md).

Beranda berisi pengantar singkat dan daftar semua inovasi dengan pencarian. Pengubahan langsung melalui Spreadsheet didukung sesuai PANDUAN-SPREADSHEET.md. Baris yang belum lengkap tidak ditampilkan dan diberi pemberitahuan pada admin.
