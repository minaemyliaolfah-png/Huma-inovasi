# Memasang Ruang Inovasi

## 1 Pasang backend di Spreadsheet

1. Buat Spreadsheet baru, lalu buka **Ekstensi → Apps Script**.
2. Ganti isi Code.gs di editor dengan seluruh isi `apps-script/Code.gs` dari paket ini, lalu simpan.
3. Buka **Project Settings → Script Properties**. Tambahkan `ADMIN_PASSWORD` dengan kata sandi pilihan Anda sepanjang 12–128 karakter.
4. Pilih fungsi **setup**, klik **Run**, lalu berikan izin Google yang diminta. Tab Program, Evidence, dan Pengaturan dibuat otomatis bersama deskripsi lima program.
5. Pilih **Deploy → New deployment → Web app**. Atur **Execute as Me** dan akses **Anyone**, lalu Deploy.
6. Salin alamat Web App yang berakhiran `/exec`. Membukanya akan menampilkan data JSON dengan `ok: true`.

Jika akses Anyone dibatasi akun sekolah, diperlukan akun atau pengaturan organisasi yang mengizinkan Web App publik. Gunakan Spreadsheet baru untuk versi ini karena strukturnya berbeda dari versi Data_Artefak sebelumnya.

## 2 Isi konfigurasi website

Buka `config.js` dan isi `apiUrl`.

```js
const APP_CONFIG = {
  apiUrl: "https://script.google.com/macros/s/ID_DEPLOYMENT_ANDA/exec",
};
```

Simpan file. Kata sandi admin disimpan melalui Script Properties pada backend.

## 3 Unggah ke GitHub Pages

1. Ekstrak ZIP, lalu buka folder hasil ekstraksi.
2. Unggah isi folder tersebut ke repository GitHub. Pastikan `index.html`, `config.js`, dan folder `assets` berada langsung pada tingkat teratas repository. Anda bisa mengunggah seluruh isi paket sekaligus.
3. Buka **Settings → Pages**. Pilih **Deploy from a branch**, branch **main**, dan **/ (root)**, lalu Save.
4. Tunggu publikasi selesai, lalu buka URL yang diberikan GitHub.

Pertahankan nama file, susunan folder, dan huruf kecil pada `index.html`. File `.nojekyll` membantu GitHub menayangkan paket sebagai situs statis. Folder `apps-script` memuat sumber backend yang juga harus ditempel ke Apps Script melalui langkah pertama.

## 4 Tambahkan tautan bukti

Masuk melalui Admin menggunakan kata sandi yang Anda atur. Pada **Beranda & profil**, ubah pengantar singkat, nama, sekolah, dan tautan Portofolio PDF. Beranda menampilkan seluruh daftar inovasi secara setara.

Pada **Program**, Anda dapat mengedit deskripsi dan foto sampul. Pada **Bukti implementasi**, pilih **Tambah bukti**, pilih program dan bagian bukti, lalu tempel tautan. Judul dan penjelasan awal akan terisi otomatis. Cocokkan dengan berkas yang dilampirkan sebelum menyimpan.

Setiap program mempunyai empat bagian berikut.

- Modul Ajar / RPP Inovatif
- Video Praktik Pembelajaran
- Hasil Karya Bersama Murid
- Refleksi & Evaluasi

Setiap bagian dapat memuat beberapa tautan. YouTube menampilkan thumbnail dan pemutar di halaman. Tautan Google Drive dengan pola `/file/d/ID/view` serta PDF langsung menyediakan tombol pratinjau. Izin berbagi pada sumber bukti menentukan apakah penilai dapat mengaksesnya.

Durasi video praktik diisi dalam detik, maksimal 300. Pemeriksaan angka pada form perlu disertai pengecekan durasi rekaman sebenarnya oleh pemilik.

## Demo lokal

Saat `apiUrl` kosong, buka `index.html` dari File Explorer. Semua file pendukung harus tetap berada dalam susunan folder yang sama. Login demo menggunakan `demo-inovasi`. Perubahan demo berlaku sampai halaman dimuat ulang. Mode demo tersedia pada file lokal dan localhost. Website publik memerlukan alamat Apps Script yang sudah diisi.

## Melakukan perubahan berikutnya

- Deskripsi, tautan bukti, dan pengantar beranda dapat diubah dari Admin dan langsung tersimpan ke Sheets.
- Tampilan diubah di `assets/css/styles.css`. Susunan halaman dan formulir berada di `assets/js/app.js`.
- Unggah kembali file yang Anda ubah ke GitHub. GitHub Pages memublikasikan pembaruannya.
- Perubahan Code.gs diterapkan melalui **Deploy → Manage deployments → Edit → New version → Deploy**. Perbarui deployment yang sama agar URL tetap.
- Jika penyimpanan terputus, muat ulang data untuk memeriksa hasil sebelum mencoba lagi. Jika ada perubahan dari sesi admin lain, aplikasi akan meminta Anda memuat ulang untuk menghindari penimpaan.

## Konten dan pemeriksaan

Deskripsi awal berasal dari bahan yang Anda kirim. Refleksi perlu dicocokkan dengan pengalaman sebenarnya. Data penelitian PELITA mengacu pada artikel tahun 2024. EXPLORE mengikuti naskah video Anda. Tautan bukti dan portofolio PDF masih perlu diisi.

Sintaks, referensi aset, konsistensi data awal, dan logika backend telah diperiksa. Pemeriksaan visual browser dan sambungan ke deployment Apps Script belum dilakukan karena browser lokal dinonaktifkan serta URL deployment belum tersedia. Setelah pemasangan, buka situs dan seluruh tautan bukti pada jendela samaran untuk memeriksa akses penilai.

## Dokumentasi layanan

- [Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Mengubah langsung melalui Spreadsheet

Anda dapat mengubah data yang sama melalui tab Program, Evidence, dan Pengaturan. Baris baru mendapat ID otomatis ketika website dimuat ulang. Urutan inovasi mengikuti urutan baris di tab Program. Lihat PANDUAN-SPREADSHEET.md untuk kolom wajib dan contoh pengisian. Data awal lima inovasi hanya diisi saat setup pertama dan dapat diedit atau ditambah.

## Memperbarui dari versi sebelumnya

Ganti file frontend di repository GitHub dan Code.gs pada proyek Apps Script yang sama. Perbarui deployment Apps Script melalui Manage deployments → Edit → New version → Deploy. Pertahankan URL backend di config.js. Struktur kolom Spreadsheet tetap sama sehingga data yang sudah ada dapat dipakai. Setelah pembaruan, muat ulang website sebelum memakai admin.

## Foto thumbnail inovasi

Unggah gambar JPG/PNG ke Drive, atur akses Siapa saja yang memiliki link → Pelihat, lalu tempel tautan file pada Admin → Inovasi → Edit → Thumbnail dari Google Drive. Pratinjau muncul sebelum Anda menyimpan. Cara yang sama tersedia lewat kolom cover di Spreadsheet. Rincian ada di PANDUAN-SPREADSHEET.md.
