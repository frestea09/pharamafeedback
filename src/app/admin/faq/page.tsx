
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AdminLayout from "../admin-layout";

export default function FAQPage() {
  return (
    <AdminLayout>
        <Card>
        <CardHeader>
            <CardTitle>Bantuan & Pertanyaan Umum (FAQ)</CardTitle>
            <CardDescription>
            Temukan jawaban atas pertanyaan umum tentang peran dan fungsi dalam aplikasi LayananReview RSUD.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Apa saja peran yang ada di aplikasi ini?</AccordionTrigger>
                <AccordionContent>
                Aplikasi ini memiliki empat peran utama: <strong>Admin Sistem</strong> (akses penuh), <strong>Kepala Unit</strong> (manajer unit spesifik), <strong>Pengguna Individu</strong> (pasien yang memberi ulasan), dan <strong>Pegawai</strong> (mengoperasikan mode kios).
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Apa perbedaan antara Admin Sistem, Admin Unit, dan Kepala Unit?</AccordionTrigger>
                <AccordionContent>
                Peran admin dibagi menjadi beberapa tingkatan untuk kontrol akses yang lebih baik:
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>Admin Sistem:</strong> Memiliki akses tertinggi. Dapat melihat semua data dari seluruh unit, mengelola semua akun (termasuk admin lain), dan satu-satunya yang bisa mengakses Log Aktivitas Sistem.</li>
                    <li><strong>Admin Unit:</strong> Fokus pada operasional satu unit. Dapat melihat analitik dan mengelola pengguna hanya untuk unit spesifik mereka (contoh: Admin Farmasi).</li>
                    <li><strong>Kepala Unit:</strong> Mirip dengan Admin Unit, peran ini ditujukan untuk manajer atau kepala departemen. Mereka dapat melihat dasbor analitik dan ulasan yang masuk untuk unit yang mereka pimpin, memungkinkan mereka memantau kinerja secara langsung.</li>
                </ul>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Apa itu Log Sistem dan siapa yang bisa mengaksesnya?</AccordionTrigger>
                <AccordionContent>
                <strong>Log Sistem</strong> adalah catatan dari semua aktivitas penting yang terjadi di dalam aplikasi, seperti login pengguna, penambahan ulasan baru, atau penghapusan data. Fitur ini berfungsi sebagai alat audit dan keamanan. Hanya pengguna dengan peran <strong>Admin Sistem</strong> yang dapat mengakses halaman Log Sistem.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Apa fungsi dari Login Pegawai (Mode Kios)?</AccordionTrigger>
                <AccordionContent>
                Login Pegawai digunakan oleh staf di setiap unit layanan untuk membuka sesi ulasan anonim. Ini memungkinkan pasien yang tidak memiliki akun untuk memberikan umpan balik secara langsung di lokasi setelah menerima layanan, menggunakan perangkat yang disediakan.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>Bagaimana cara kerja "Mode Pasien"?</AccordionTrigger>
                <AccordionContent>
                Setelah seorang pegawai login, mereka dapat mengaktifkan "Mode Pasien". Mode ini menyembunyikan semua menu dan navigasi, hanya menampilkan formulir ulasan. Ini memastikan pasien dapat memberikan umpan balik dengan fokus tanpa melihat antarmuka internal pegawai. Pegawai dapat keluar dari mode ini untuk kembali ke dasbor mereka.
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </CardContent>
        </Card>
    </AdminLayout>
  );
}
