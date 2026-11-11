// Konten awal untuk pratinjau lokal. Konten website terhubung dikelola melalui Admin.
const SEED = {
  programs: [
    {
      id: "pelita",
      short: "PELITA",
      title:
        "PELITA — Pembelajaran Terdiferensiasi dan Literasi Terintegrasi",
      summary:
        "Pembelajaran yang menghubungkan literasi mandiri di rumah, pendampingan sesuai kebutuhan siswa, dan unjuk karya untuk membangun kesiapan belajar.",
      background:
        "Kesiapan siswa sebelum mengikuti pembelajaran berbeda-beda. Sebagian siswa memerlukan dukungan untuk memahami materi awal, membangun kebiasaan belajar mandiri, dan memanfaatkan teknologi untuk kegiatan belajar. PELITA dikembangkan untuk memberikan akses belajar yang fleksibel sekaligus menghubungkan kegiatan di rumah dengan pembelajaran di kelas.",
      objective:
        "Mendukung kesiapan belajar siswa melalui literasi mandiri, pembelajaran terdiferensiasi, dan keterlibatan orang tua. Siswa memperoleh kesempatan mempelajari materi sesuai kebutuhan serta menunjukkan pemahamannya melalui beragam bentuk karya.",
      process:
        "Pembelajaran diawali dengan mengenali kesiapan siswa. Siswa mengakses materi interaktif dan melakukan kegiatan literasi mandiri di rumah. Jurnal belajar membantu mencatat kegiatan serta keterlibatan pendampingan orang tua. Di kelas, guru memfasilitasi elaborasi pemahaman, diskusi, dan pendampingan yang disesuaikan dengan kebutuhan siswa. Pembelajaran dilanjutkan dengan unjuk karya dan refleksi.",
      technology:
        "Media interaktif memberikan akses ke bahan belajar dan mendukung variasi penyajian materi serta produk siswa. Dokumentasi penggunaan AI dapat ditambahkan untuk artefak yang memang dibuat dengan bantuan AI, disertai contoh proses dan pemeriksaan hasilnya.",
      results:
        "Artikel PELITA tahun 2024 melaporkan penelitian pada 74 siswa kelas XII di SMA Negeri 1 Kapuas Murung. Artikel tersebut mencatat perubahan rata-rata nilai dari 44,9 menjadi 70,1, sebanyak 75% orang tua melaporkan lebih sering terlibat dalam pembelajaran anak, dan 80% siswa merasa lebih termotivasi belajar di rumah. Angka tersebut merupakan hasil yang dilaporkan dalam penelitian PELITA tahun 2024.",
      reflection:
        "Pendampingan dapat diarahkan berdasarkan jurnal belajar, asesmen, serta umpan balik siswa dan orang tua. Pengembangan berikutnya perlu menjaga kemudahan akses bahan belajar dan memberi pilihan aktivitas yang sesuai dengan kebutuhan siswa.",
      cover: "",
      revision: "",
    },
    {
      id: "bahalap",
      short: "BAHALAP",
      title:
        "BAHALAP — Belajar Aktif, Hasilkan Karya, Luaskan Pengetahuan",
      summary:
        "Strategi pembelajaran yang mengajak siswa mengamati lingkungan, menghubungkan gagasan, menghasilkan karya, dan merefleksikan pembelajaran berbasis kearifan lokal.",
      background:
        "Pembelajaran Bahasa Indonesia memiliki ruang untuk membantu siswa memahami hubungan antara teks dan kehidupan di sekitarnya. BAHALAP dikembangkan untuk menghadirkan pengalaman belajar yang berkesadaran, bermakna, dan menggembirakan melalui eksplorasi lingkungan, kolaborasi, serta pembuatan karya.",
      objective:
        "Mendorong siswa berpikir kritis, menjelaskan fenomena, menghubungkan pengetahuan dengan kearifan lokal, dan menyampaikan pemahaman melalui karya. Proses belajar memberi kesempatan kepada siswa untuk berinteraksi dengan teman, guru, dan sumber belajar di masyarakat.",
      process:
        "Tahapan BAHALAP meliputi Berkesadaran dalam belajar, Amati sekitar, Hubungkan gagasan, Aplikasikan pemahaman, Libatkan mitra belajar, Apresiasi prosesnya, serta Perbaiki dengan refleksi. Siswa melakukan observasi dan wawancara, mengolah temuan, berdiskusi, lalu menghasilkan karya yang menunjukkan pemahaman mereka. Apresiasi dan refleksi membantu siswa meninjau proses serta memperbaiki hasil belajar.",
      technology:
        "Media interaktif PELITA mendukung akses bahan belajar dan variasi aktivitas. Teknologi juga digunakan untuk menyajikan hasil belajar dalam bentuk video, podcast, artikel, atau buku digital sesuai kegiatan yang didokumentasikan. Penjelasan penggunaan AI disertakan pada karya yang memiliki bukti proses penggunaannya.",
      results:
        "Naskah praktik baik BAHALAP mendokumentasikan pembelajaran melalui observasi, wawancara, diskusi, dan produk siswa yang menghubungkan fenomena sosial dengan kearifan lokal. Bukti pada halaman ini dapat memperlihatkan hubungan antara kegiatan tersebut, karya yang dihasilkan, dan hasil asesmen pada pelaksanaan yang sama.",
      reflection:
        "Refleksi diarahkan pada kemampuan siswa mengolah informasi, menyampaikan hubungan sebab-akibat, serta menghargai proses belajar bersama. Tindak lanjut dapat mencakup perbaikan panduan observasi, penguatan pendampingan, dan pengembangan kegiatan dengan mitra belajar.",
      cover: "",
      revision: "",
    },
    {
      id: "huma-belajar",
      short: "Huma Belajar",
      title: "Huma Belajar — Ruang Belajar Bahasa Indonesia dari Rumah",
      summary:
        "Aplikasi pembelajaran Bahasa Indonesia yang menghimpun video, materi, kuis, permainan interaktif, dan karya siswa untuk mendukung belajar mandiri.",
      background:
        "Siswa membutuhkan bahan belajar yang mudah ditemukan dan dapat diakses kembali setelah kegiatan di kelas. Huma Belajar dikembangkan sebagai ruang belajar yang menyatukan materi, aktivitas latihan, serta hasil karya agar siswa memiliki alur belajar yang lebih jelas dari rumah.",
      objective:
        "Memudahkan siswa mempelajari materi Bahasa Indonesia secara mandiri, berlatih melalui kuis dan permainan, serta memperoleh ruang untuk menampilkan karya. Fasilitas pemantauan belajar mendukung guru dalam meninjau perkembangan siswa dan menentukan pendampingan berikutnya.",
      process:
        "Siswa memilih materi yang dipelajari, menonton video atau membaca bahan yang tersedia, kemudian mengerjakan latihan dan kuis. Permainan interaktif menjadi variasi aktivitas untuk melatih pemahaman. Karya siswa ditampilkan sebagai bagian dari proses belajar dan apresiasi. Guru meninjau informasi belajar yang tersedia untuk merencanakan tindak lanjut.",
      technology:
        "Huma Belajar berfungsi sebagai tempat akses bahan belajar dan aktivitas interaktif. Pada artefak yang dikembangkan dengan AI, halaman bukti perlu menjelaskan pekerjaan yang dibantu, hasil yang digunakan, dan pemeriksaan guru sebelum materi diberikan kepada siswa.",
      results:
        "Penilai dapat menelusuri contoh paket materi, mencoba kuis dan permainan, melihat karya siswa, serta memeriksa contoh pemantauan belajar. Data penggunaan dan hasil asesmen dapat ditambahkan sesuai periode pelaksanaan yang didokumentasikan.",
      reflection:
        "Evaluasi diarahkan pada kemudahan siswa menggunakan aplikasi, kesesuaian materi dan latihan, serta manfaat informasi pemantauan bagi guru. Masukan siswa dapat digunakan untuk memperbaiki navigasi, keterbacaan materi, dan variasi kegiatan belajar.",
      cover: "",
      revision: "",
    },
    {
      id: "cerita-rakyat",
      short: "Cerita Rakyat",
      title:
        "Revitalisasi Cerita Rakyat — Dari Tuturan Masyarakat Menjadi Karya Siswa",
      summary:
        "Proyek literasi yang mengajak siswa menggali cerita dari masyarakat, menyusun ulang narasi, dan mengembangkan karya dengan bantuan AI serta Canva.",
      background:
        "Cerita rakyat di lingkungan siswa menyimpan pengetahuan dan nilai budaya yang perlu dikenali kembali. Sebagian cerita belum dikenal oleh siswa. Proyek ini menghubungkan pembelajaran Bahasa Indonesia dengan penelusuran cerita di masyarakat serta pengembangan media yang membantu penyampaian cerita kepada pembaca dan penonton.",
      objective:
        "Melatih keterampilan menggali informasi, menyimak, menyusun cerita, dan menyajikan gagasan secara kreatif. Siswa juga belajar mengenali sumber cerita, menghargai pengetahuan masyarakat, serta mengambil keputusan saat menggunakan teknologi dan AI.",
      process:
        "Siswa menggali cerita melalui interaksi langsung dengan masyarakat sekitar. Informasi yang diperoleh dihimpun dan digunakan sebagai dasar penyusunan ulang cerita. Siswa mengeksplorasi cara penyampaian dengan bantuan Gemini dan NotebookLM, kemudian mengembangkan gagasan karya melalui ChatGPT atau Gemini. Hasil pengembangan disusun menjadi karya menggunakan Canva. Salah satu cerita yang disebut dalam naskah profil adalah asal-usul Desa Mampai.",
      technology:
        "AI membantu mengeksplorasi gagasan, cara penyampaian, dan kemungkinan bentuk karya. Siswa mengolah informasi dari sumber masyarakat, memilih gagasan, menyusun narasi, dan menentukan bentuk penyajian. Dokumentasi proses perlu memperlihatkan bagian yang dibantu AI, revisi siswa, serta pengecekan kesesuaian cerita dengan sumbernya.",
      results:
        "Bukti dapat disusun dari catatan wawancara, draf cerita, contoh proses berbantuan AI, revisi, hingga karya final. Rangkaian tersebut memperlihatkan bagaimana informasi dari masyarakat diolah menjadi produk pembelajaran oleh siswa.",
      reflection:
        "Refleksi membahas perubahan pemahaman siswa terhadap cerita lokal, pengalaman menggali informasi, dan keputusan saat mengolah saran AI. Tindak lanjut dapat diarahkan pada pengecekan cerita bersama narasumber serta pengembangan koleksi cerita yang dapat dipelajari kembali.",
      cover: "",
      revision: "",
    },
    {
      id: "explore",
      short: "EXPLORE",
      title: "EXPLORE — Petualangan Teks Eksplanasi",
      summary:
        "Pembelajaran teks eksplanasi kelas XI dengan objek 3D dan Augmented Reality melalui Assemblr EDU, terintegrasi dengan Kelas Digital Huma Betang.",
      background:
        "Fenomena alam seperti gempa bumi, erupsi, dan tsunami sulit diamati secara langsung dalam pembelajaran. Materi teks eksplanasi memerlukan pemahaman tentang peristiwa, penyebab, serta proses terjadinya fenomena. EXPLORE dirancang untuk membantu siswa melakukan pengamatan melalui media visual yang dapat dieksplorasi.",
      objective:
        "Membantu siswa Bahasa Indonesia Tingkat Lanjut kelas XI mengenali teks eksplanasi, menemukan ciri-cirinya, serta mengolah hasil pengamatan menjadi penjelasan yang memperlihatkan hubungan sebab-akibat.",
      process:
        "Guru mengenalkan materi dan membimbing siswa mengeksplorasi fenomena melalui media Assemblr EDU. Siswa bekerja dalam kelompok dan bergantian mengamati objek 3D atau Augmented Reality yang telah disiapkan. Hasil pengamatan dibahas melalui tiga pertanyaan utama, yaitu apa yang terjadi, mengapa terjadi, dan bagaimana prosesnya. Siswa mengolah temuan dalam LKPD dan berdiskusi untuk membangun penjelasan. Guru mendampingi pengamatan dan pengolahan informasi. Modul interaktif dibagikan melalui Kelas Digital Huma Betang agar dapat dipelajari kembali dari rumah.",
      technology:
        "Assemblr EDU digunakan sebagai media eksplorasi objek 3D dan Augmented Reality. Kelas Digital Huma Betang menjadi sarana akses dan berbagi modul. Keterangan penggunaan AI dapat ditambahkan jika ada tahap pembuatan media atau kegiatan belajar yang memang menggunakan AI dan didukung dokumentasi.",
      results:
        "Penilai dapat membuka media EXPLORE, meninjau video praktik pembelajaran, serta melihat LKPD dan penjelasan yang dihasilkan siswa setelah pengamatan. Dokumentasi berbagi modul dapat melengkapi bukti pemanfaatan media oleh rekan guru.",
      reflection:
        "Evaluasi diarahkan pada kemampuan siswa menghubungkan hasil pengamatan dengan struktur dan isi teks eksplanasi. Guru dapat meninjau ketepatan hubungan sebab-akibat dalam jawaban siswa, keterlibatan kelompok, serta kemudahan mengakses media. Perbaikan dapat dilakukan pada panduan pengamatan, pertanyaan LKPD, dan pendampingan penggunaan perangkat.",
      cover: "",
      revision: "",
    },
  ],
  evidence: [],
  settings: {
    id: "main",
    name: "Mina Emylia Olfah",
    school: "SMA Negeri 1 Kapuas Murung",
    intro:
      "Saya mengembangkan pembelajaran Bahasa Indonesia yang menghubungkan kegiatan di kelas, belajar mandiri di rumah, dan pengalaman di lingkungan masyarakat. Portofolio ini menghimpun praktik baik, bukti pelaksanaan, karya siswa, serta refleksi pembelajaran.",
    featured: "cerita-rakyat",
    portfolio: "",
    revision: "",
  },
};
