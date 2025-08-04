
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function FAQPage() {
  return (
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
              Aplikasi ini memiliki tiga peran utama: <strong>Admin</strong> (mengelola sistem dan data), <strong>Pengguna Individu</strong> (memberikan ulasan pribadi dan melihat riwayat), dan <strong>Pegawai</strong> (mengoperasikan mode kios untuk ulasan pasien di tempat).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Apa perbedaan antara Admin Sistem dan Admin Unit?</AccordionTrigger>
            <AccordionContent>
              <strong>Admin Sistem</strong> memiliki akses penuh ke seluruh data di semua unit, termasuk mengelola semua akun pengguna dan admin. <strong>Admin Unit</strong> (misalnya, Admin Farmasi) hanya dapat melihat data analitik dan mengelola pengguna untuk unit spesifik mereka.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Apa fungsi dari Login Pegawai (Mode Kios)?</AccordionTrigger>
            <AccordionContent>
              Login Pegawai digunakan oleh staf di setiap unit layanan untuk membuka sesi ulasan anonim. Ini memungkinkan pasien yang tidak memiliki akun untuk memberikan umpan balik secara langsung di lokasi setelah menerima layanan, menggunakan perangkat yang disediakan.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-4">
            <AccordionTrigger>Apa saja unit layanan yang ada?</AccordionTrigger>
            <AccordionContent>
              Saat ini, aplikasi mencakup semua unit layanan yang terdaftar di RSUD Oto Iskandar Dinata, termasuk:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Unit Perawatan (Rawat Inap, Rawat Jalan, ICU)</li>
                <li>Unit Penunjang Medis (Farmasi, Laboratorium, Radiologi)</li>
                <li>Unit Gawat Darurat (IGD)</li>
                <li>dan unit administrasi serta layanan lainnya.</li>
              </ul>
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
  );
}
