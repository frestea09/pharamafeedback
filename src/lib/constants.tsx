
import { LayoutDashboard, Users, MessageSquare, HelpCircle, Home, FileText } from "lucide-react";

export const serviceUnits = ["Farmasi", "Rawat Jalan", "Rawat Inap", "Laboratorium", "Radiologi"];

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
      content: `Saat ini, kami memiliki lima unit layanan:
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Farmasi:</strong> Melayani pengambilan resep dan konsultasi obat.</li>
          <li><strong>Rawat Jalan:</strong> Unit untuk pasien yang berobat tanpa menginap.</li>
          <li><strong>Rawat Inap:</strong> Unit perawatan untuk pasien yang memerlukan observasi dan perawatan intensif.</li>
          <li><strong>Laboratorium:</strong> Unit untuk pemeriksaan sampel medis.</li>
          <li><strong>Radiologi:</strong> Unit untuk layanan pencitraan medis seperti X-ray dan USG.</li>
        </ul>`
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
