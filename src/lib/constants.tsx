
import { LayoutDashboard, Users, MessageSquare, HelpCircle, Home, FileText } from "lucide-react";

export const serviceUnits = [
  // Lantai 4 (L4)
  "L4 - Ruang Direktur",
  "L4 - Ruang Rapat",
  "L4 - Ruang Aula",
  "L4 - Ruang Wadir 1/2/3",
  "L4 - Ruang Tata Usaha",
  "L4 - Ruang Keuangan",
  "L4 - Ruang Komite Medik",
  "L4 - Ruang Komite Keperawatan",
  // Lantai 3 (L3)
  "L3 - Ruang Perawatan Kelas I Anggrek",
  "L3 - Ruang Perawatan VIP Anggrek",
  "L3 - Ruang Perawatan VVIP Anggrek",
  "L3 - Ruang Tata Usaha",
  "L3 - Ruang Keuangan",
  // Lantai 2 (L2)
  "L2 - Ruang Perawatan Dewasa Flamboyan",
  "L2 - Ruang Perawatan Anak Anyelir",
  // Lantai 1 (L1)
  "L1 - Instalasi Laboratorium",
  "L1 - Laboratorium PA",
  "L1 - Bank Darah",
  // Lantai GF (Ground Floor)
  "GF - Pusat Informasi",
  "GF - Instalasi Radiologi",
  "GF - Instalasi Farmasi",
  // Gedung A - Lantai 3 (L3)
  "L3 - Ruang IBS / Ruang Operasi",
  "L3 - Ruang Cath Lab / Catheterisasi",
  // Gedung A - Lantai 2 (L2)
  "L2 - Ruang ICU, NICU, PICU",
  "L2 - Ruang Hemodialisis",
  "L2 - Ruang Stroke Unit",
  // Gedung A - Lantai 1 (L1)
  "L1 - Ruang Bougenville (Ruang Bayi)",
  "L1 - Ruang Dahlia (Bersalin)",
  "L1 - Ruang Camelia",
  // Gedung A - Lantai GF (Ground Floor)
  "GF - Ruang IGD (Instalasi Gawat Darurat)",
  "GF - Ruang IGD PONEK",
  "GF - Ruang CSSD",
  // Gedung BTC - Lantai GF (Ground Floor)
  "GF - Instalasi Farmasi (Gedung BTC)",
  "GF - Bank Darah (Gedung BTC)",
  // Gedung A - Lantai LG (Lower Ground)
  "LG - IPSRS",
  "LG - Ruang Pemulasaran Jenazah"
];

export const adminMenuItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dasbor Utama", tooltip: "Dasbor" },
    { href: "/admin/reviews", icon: MessageSquare, label: "Semua Ulasan", tooltip: "Ulasan" },
    { href: "/admin/users", icon: Users, label: "Kelola Pengguna", tooltip: "Pengguna" },
    { href: "/admin/faq", icon: HelpCircle, label: "Bantuan & Panduan", tooltip: "Bantuan" },
];

export const userMenuItems = [
    { href: "/dashboard", icon: Home, label: "Beri Ulasan Baru" },
    { href: "/dashboard/history", icon: FileText, label: "Riwayat Ulasan" },
    { href: "/faq", icon: HelpCircle, label: "Bantuan & Panduan" },
];

export const generalFaqItems = [
    {
      value: "item-1",
      trigger: "Apa saja peran yang ada di aplikasi ini?",
      content: "Aplikasi ini memiliki tiga peran utama: <strong>Admin</strong> (mengelola sistem dan data), <strong>Pengguna Individu</strong> (memberikan ulasan pribadi dan melihat riwayat), dan <strong>Pegawai</strong> (mengoperasikan mode kios untuk ulasan pasien di tempat)."
    },
    {
      value: "item-2",
      trigger: "Apa fungsi dari Login Pegawai (Mode Kios)?",
      content: "Login Pegawai digunakan oleh staf di setiap unit layanan untuk membuka sesi ulasan anonim. Ini memungkinkan pasien yang tidak memiliki akun untuk memberikan umpan balik secara langsung di lokasi setelah menerima layanan, menggunakan perangkat yang disediakan."
    },
    {
      value: "item-3",
      trigger: "Apa saja unit layanan yang ada?",
      content: `Aplikasi ini mencakup semua unit layanan di rumah sakit, mulai dari ruang perawatan, instalasi farmasi, laboratorium, hingga unit penunjang lainnya. Anda dapat memilih unit spesifik saat memberikan ulasan.`
    },
  ];
  
  export const adminFaqItems = [
      {
          value: "item-1",
          trigger: "Apa perbedaan antara Admin Sistem dan Admin Unit?",
          content: "<strong>Admin Sistem</strong> memiliki akses penuh ke seluruh data di semua unit, termasuk mengelola semua akun pengguna dan admin. <strong>Admin Unit</strong> (misalnya, Admin Farmasi) hanya dapat melihat data analitik dan mengelola pengguna untuk unit spesifik mereka."
      },
      {
          value: "item-2",
          trigger: "Bagaimana cara mengelola pengguna?",
          content: "Masuk ke menu <strong>Kelola Pengguna</strong>. Di sana Anda dapat menambah, mengubah, atau menghapus akun pengguna dan admin. Anda juga bisa menyaring pengguna berdasarkan peran atau email."
      }
  ];
  
  export const userFaqItems = [
      {
          value: "item-1",
          trigger: "Bagaimana cara memberikan ulasan?",
          content: "Setelah login, Anda akan langsung diarahkan ke halaman <strong>Beri Ulasan Baru</strong>. Pilih unit layanan yang ingin Anda ulas, berikan peringkat bintang, dan isi komentar jika perlu, lalu kirim."
      },
      {
          value: "item-2",
          trigger: "Apakah saya bisa melihat ulasan yang pernah saya berikan?",
          content: "Tentu. Semua ulasan yang pernah Anda kirimkan tersimpan dan dapat dilihat di menu <strong>Riwayat Ulasan</strong>."
      }
  ];
