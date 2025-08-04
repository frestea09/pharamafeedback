
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital } from "lucide-react";
import Link from "next/link";


export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
        <div className="flex flex-col items-center text-center mb-12">
            <Link href="/" aria-label="Beranda">
                <Hospital className="h-12 w-12 text-primary" />
            </Link>
            <h1 className="text-4xl font-bold mt-4">Pusat Bantuan</h1>
            <p className="text-muted-foreground mt-2">Semua yang perlu Anda ketahui tentang LayananReview RSUD.</p>
        </div>
        <Card>
        <CardHeader>
            <CardTitle>Pertanyaan Umum (FAQ)</CardTitle>
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
                Saat ini, kami memiliki lima unit layanan:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Farmasi:</strong> Melayani pengambilan resep dan konsultasi obat.</li>
                    <li><strong>Rawat Jalan:</strong> Unit untuk pasien yang berobat tanpa menginap.</li>
                    <li><strong>Rawat Inap:</strong> Unit perawatan untuk pasien yang memerlukan observasi dan perawatan intensif.</li>
                    <li><strong>Laboratorium:</strong> Unit untuk pemeriksaan sampel medis.</li>
                    <li><strong>Radiologi:</strong> Unit untuk layanan pencitraan medis seperti X-ray dan USG.</li>
                </ul>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>Bagaimana cara kerja "Mode Pasien"?</AccordionTrigger>
                <AccordionContent>
                Setelah seorang pengguna (misalnya, pegawai farmasi) login, mereka dapat mengaktifkan "Mode Pasien" dari dasbor mereka. Mode ini menyembunyikan semua menu dan navigasi, hanya menampilkan formulir ulasan yang bersih. Ini memastikan pasien dapat memberikan umpan balik dengan fokus tanpa melihat antarmuka internal. Pengguna dapat dengan mudah keluar dari mode ini untuk kembali ke dasbor mereka.
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </CardContent>
        </Card>
        <div className="text-center mt-8">
            <Button asChild>
                <Link href="/">Kembali ke Beranda</Link>
            </Button>
        </div>
    </div>
  );
}
