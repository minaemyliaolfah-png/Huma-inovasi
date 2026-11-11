# Mengelola isi dari Spreadsheet

Data yang ditampilkan website berasal dari Spreadsheet. Anda dapat memakai Admin website atau mengubah sel langsung. Setelah menyimpan perubahan pada Sheets, muat ulang website untuk melihat hasil terbaru. Pengunjung yang sudah membuka halaman juga perlu memuat ulang.

## Tab Program

Satu baris mewakili satu inovasi. Lima inovasi awal terisi saat setup pertama. Anda bebas mengedit, menambah, atau menghapusnya. Urutan tampilan mengikuti urutan baris pada tab ini.

| Kolom      | Isi                                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| id         | Dibuat otomatis saat website dimuat ulang. Biarkan kosong untuk inovasi baru. Pertahankan ID inovasi lama. |
| title      | **Wajib.** Judul lengkap, misalnya Pembelajaran Teks Eksplanasi dengan EXPLORE.                            |
| short      | **Wajib.** Nama singkat, misalnya EXPLORE.                                                                 |
| summary    | **Wajib.** Pengantar ringkas untuk kartu inovasi.                                                          |
| background | Latar belakang.                                                                                            |
| objective  | Tujuan pembelajaran.                                                                                       |
| process    | Langkah pelaksanaan.                                                                                       |
| technology | Penggunaan teknologi dan AI.                                                                               |
| results    | Hasil yang dapat ditinjau beserta konteksnya.                                                              |
| reflection | Refleksi dan tindak lanjut.                                                                                |
| cover      | Tautan berbagi satu file gambar Google Drive. Kosongkan untuk ilustrasi bawaan.                            |
| revision   | Kolom sistem. Biarkan nilainya atau kosongkan pada baris baru.                                             |

Untuk menambah inovasi, isi title, short, dan summary pada baris kosong. Kolom lainnya dapat dilengkapi bertahap. Muat ulang website agar ID tercipta. Inovasi tersebut juga akan tersedia pada pilihan program di form Tambah bukti.

Jika menyalin baris lama untuk membuat inovasi baru, kosongkan id dan revision pada baris salinan. Jangan menggunakan satu ID untuk dua inovasi.

## Tab Evidence

Satu baris mewakili satu bukti. Satu inovasi dan satu bagian boleh mempunyai banyak bukti.

| Kolom       | Isi                                                                    |
| ----------- | ---------------------------------------------------------------------- |
| id          | Dibuat otomatis saat website dimuat ulang. Kosongkan untuk bukti baru. |
| programId   | **Wajib.** Salin ID inovasi terkait dari tab Program.                  |
| section     | **Wajib.** Salah satu kode di bawah.                                   |
| title       | **Wajib.** Judul bukti.                                                |
| description | **Wajib.** Penjelasan bukti, proses, atau konteks kegiatan.            |
| url         | **Wajib.** Tautan HTTPS bukti yang dapat diakses penilai.              |
| original    | Tautan HTTPS file asli jika berbeda.                                   |
| creator     | Nama pembuat atau kelompok sesuai izin publikasi.                      |
| date        | Keterangan waktu kegiatan.                                             |
| ai          | Penjelasan penggunaan teknologi atau AI dan pemeriksaan hasil.         |
| duration    | **Wajib untuk section video.** Durasi dalam detik, 1 sampai 300.       |
| revision    | Kolom sistem.                                                          |

Kode section yang digunakan website adalah sebagai berikut.

| Kode     | Bagian halaman             |
| -------- | -------------------------- |
| modul    | Modul Ajar / RPP Inovatif  |
| video    | Video Praktik Pembelajaran |
| karya    | Hasil Karya Bersama Murid  |
| refleksi | Refleksi & Evaluasi        |

Contoh pengisian bukti menggunakan programId `explore`, section `modul`, title `Modul Teks Eksplanasi`, description sesuai isi dokumen, dan url berupa tautan Google Drive yang sudah dibuka aksesnya. Salin ID sebenarnya dari tab Program jika inovasi dibuat melalui admin.

## Tab Pengaturan

Gunakan satu baris dengan id `main`.

| Kolom     | Isi                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| id        | `main`                                                                                                        |
| name      | Nama peserta.                                                                                                 |
| school    | Sekolah.                                                                                                      |
| intro     | Pengantar singkat yang tampil di bagian atas beranda. Disarankan satu paragraf.                               |
| featured  | Kolom versi lama. Beranda terbaru menampilkan seluruh inovasi. Nilainya boleh dipertahankan atau dikosongkan. |
| portfolio | Tautan HTTPS Portofolio PDF. Kosongkan jika belum tersedia.                                                   |
| revision  | Kolom sistem.                                                                                                 |

## Catatan pengelolaan

- Pertahankan nama tab, nama header, dan urutan kolom. Tulis data mulai baris kedua.
- Baris kosong dilewati. Inovasi yang belum memiliki title, short, atau summary belum tampil. Bukti dengan kolom wajib belum lengkap, kode section tidak sesuai, atau programId tidak ditemukan juga belum tampil. Admin menampilkan jumlah baris yang perlu dilengkapi.
- ID baru dibuat ketika website mengambil data. Muat ulang website setelah menambah baris, lalu lihat kembali Spreadsheet bila perlu menyalin ID.
- Perubahan langsung pada sel ikut diperiksa saat admin menyimpan. Jika formulir admin dibuka sebelum perubahan Sheets, aplikasi meminta memuat ulang untuk menghindari penimpaan.
- Untuk menghapus inovasi melalui Sheets, hapus juga bukti terkait atau pindahkan programId bukti tersebut. Melalui admin, aplikasi meminta bukti dihapus terlebih dahulu.
- Pengelolaan melalui Sheets memerlukan akses editor Spreadsheet. Pengunjung website hanya dapat membaca data, sementara tindakan admin tetap memerlukan login.

## Thumbnail dari Google Drive

1. Unggah foto atau desain sampul JPG/PNG ke Google Drive. Gambar mendatar sekitar 1600 × 1000 piksel cocok untuk kartu inovasi.
2. Buka Bagikan. Atur Akses umum menjadi Siapa saja yang memiliki link, dengan peran Pelihat.
3. Salin tautan file, misalnya `https://drive.google.com/file/d/ID_GAMBAR/view?usp=sharing`.
4. Tempel pada kolom cover di tab Program atau Thumbnail dari Google Drive pada Admin → Inovasi → Edit.
5. Periksa pratinjau di admin, lalu simpan. Muat ulang website untuk melihat hasilnya.

Gunakan tautan satu file gambar. Tautan folder tidak dapat dipakai sebagai thumbnail. Tautan Drive dengan pola file/d, open?id, uc?id, dan thumbnail?id dikenali. Jika tautan berisi resourcekey, nilainya ikut digunakan. Tautan gambar HTTPS langsung yang sudah digunakan pada versi sebelumnya tetap didukung.

Foto thumbnail diatur terpisah dari tautan video evidence. Untuk kartu inovasi, isi cover dengan gambar pilihan Anda. YouTube pada bagian video tetap memakai thumbnail videonya sendiri.

Jika gambar tidak muncul, periksa izin file menggunakan jendela samaran dan coba muat ulang pratinjau. Drive dapat membatasi penyajian gambar atau akses file, sehingga kegagalan pemuatan ditangani dengan ilustrasi bawaan. Pengujian akses gambar Drive secara langsung belum dilakukan karena belum ada tautan gambar pengguna yang diberikan.

[Petunjuk berbagi file dari Google](https://support.google.com/drive/answer/2494822)
