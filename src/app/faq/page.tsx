
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
                Aplikasi ini memiliki beberapa peran utama: <strong>Admin</strong> (mengelola sistem), <strong>Kepala Unit</strong> (memantau unitnya), <strong>Pengguna Individu</strong> (memberikan ulasan pribadi), dan <strong>Pegawai</strong> (mengoperasikan mode kios untuk ulasan pasien di tempat).
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Apa perbedaan antara Admin dan Kepala Unit?</AccordionTrigger>
                <AccordionContent>
                <strong>Admin</strong> memiliki akses luas untuk mengelola sistem. <strong>Kepala Unit</strong> memiliki akses terbatas untuk melihat data analitik dan ulasan khusus untuk unit layanan yang mereka pimpin, membantu mereka memonitor kinerja secara langsung.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Apa fungsi dari Login Pegawai (Mode Kios)?</AccordionTrigger>
                <AccordionContent>
                Login Pegawai digunakan oleh staf di setiap unit layanan untuk membuka sesi ulasan anonim. Ini memungkinkan pasien yang tidak memiliki akun untuk memberikan umpan balik secara langsung di lokasi setelah menerima layanan, menggunakan perangkat yang disediakan.
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
                <AccordionTrigger>Bagaimana cara kerja "Mode Pasien"?</AccordionTrigger>
                <AccordionContent>
                Setelah seorang pegawai login, mereka dapat mengaktifkan "Mode Pasien". Mode ini menyembunyikan semua menu dan navigasi, hanya menampilkan formulir ulasan. Ini memastikan pasien dapat memberikan umpan balik dengan fokus tanpa melihat antarmuka internal pegawai. Pegawai dapat keluar dari mode ini untuk kembali ke dasbor mereka.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
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
