# Memasang pembaruan media — 14 November 2026

## Perubahan

- Indikator jumlah bagian bukti dan pesan kekurangan unggahan dihapus dari halaman publik.
- Video praktik berada di atas halaman inovasi, setelah judul dan ringkasan.
- Bagian Media Pembelajaran memuat tautan materi, aplikasi, permainan, atau website dengan thumbnail.
- Karya murid dapat memuat banyak kartu: YouTube, poster, dokumen, atau website. Tambahkan satu bukti per karya.
- Thumbnail YouTube otomatis. File Drive mencoba thumbnail Drive; tersedia thumbnail manual untuk semua media. Jika gambar tidak dapat dimuat, ilustrasi bawaan tetap menjadi tautan ke media asli.
- Nama, sekolah, judul, dan pengantar header tersimpan di config.js. Isi profil lama di Spreadsheet dipertahankan, tetapi tidak digunakan untuk header.

## Urutan pembaruan website yang sudah ada

1. Buka proyek Apps Script yang sekarang terhubung ke Spreadsheet.
2. Ganti SELURUH isi Kode.gs dengan apps-script/Code.gs atau apps-script/SALIN-SELURUH-KODE.txt. Keduanya identik; pilih satu, jangan tempel keduanya. Simpan.
3. Jalankan setup. Kolom thumbnail otomatis ditambahkan setelah revision pada tab Evidence. Data lama dipertahankan. Tidak perlu membuat Spreadsheet baru atau mengganti kata sandi.
4. Perbarui deployment yang sama: Deploy → Manage deployments → Edit → New version → Deploy. URL /exec tetap sama.
5. Unggah isi paket frontend ke repository Huma-inovasi: index.html, config.js, folder assets, dan .nojekyll. Pertahankan susunan folder. Alamat Apps Script Anda sudah terisi pada config.js.
6. Setelah GitHub Pages selesai memperbarui, muat ulang halaman dengan Ctrl+F5.

## Menambahkan media

Admin → Bukti implementasi → Tambah bukti. Pilih inovasi dan bagian, isi tautan beserta pengantarnya, lalu simpan. Untuk beberapa karya siswa, ulangi dengan bagian Hasil Karya Bersama Murid. Gunakan bagian Media Pembelajaran untuk materi, game, website, atau aplikasi pendukung. Gunakan Video Praktik Pembelajaran untuk rekaman mengajar yang ingin ditampilkan di atas (durasi maksimal 300 detik).

Untuk gambar manual, unggah satu gambar ke Drive, buka akses Siapa saja yang memiliki link → Pelihat, lalu tempel tautannya pada Thumbnail media. Pengisian langsung di Spreadsheet memakai kolom thumbnail. Tautan folder tidak dapat dipakai sebagai gambar.

## Pemeriksaan

Pemeriksaan sintaks, fungsi tampilan, video di atas, beberapa karya, thumbnail dan cadangannya, serta migrasi kolom yang mempertahankan data lama sudah berhasil. Pengujian visual di browser dan pemasangan pada deployment aktif belum dilakukan dari sesi ini.
