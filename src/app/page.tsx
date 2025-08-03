
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Users, Clock, TestTube, LogIn, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TestTube className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">PharmaFeedback</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login/user">Login Pengguna</Link>
          </Button>
          <Button asChild>
            <Link href="/admin">Login Admin</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Tingkatkan Kualitas Layanan Farmasi, Bersama.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Umpan balik Anda sangat penting. Bantu kami meningkatkan layanan farmasi dengan membagikan pengalaman Anda. Cepat, mudah, dan berdampak.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login/user">Berikan Ulasan</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="bg-card py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground">Mengapa Umpan Balik Anda Penting</h3>
              <p className="mt-2 text-muted-foreground">
                Ulasan Anda memberikan wawasan langsung yang mengarah pada pelayanan yang lebih baik untuk semua orang.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Smile className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Tingkatkan Kualitas Pelayanan</CardTitle>
                </CardHeader>
                <CardContent>
                  Nilai keramahan dan profesionalisme staf untuk memastikan semua orang menerima pelayanan yang sopan dan efektif.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Pastikan Ketersediaan Obat</CardTitle>
                </CardHeader>
                <CardContent>
                  Umpan balik Anda membantu kami mengelola stok obat agar selalu tersedia saat dibutuhkan.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Kurangi Waktu Tunggu</CardTitle>
                </CardHeader>
                <CardContent>
                  Bantu kami mengidentifikasi hambatan dan merampingkan proses kami untuk melayani Anda lebih cepat.
                </CardContent>
              </Card>
            </div>
             <div className="mt-20 text-center">
              <h3 className="text-3xl font-bold text-foreground">Mulai Dari Mana?</h3>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Aplikasi ini memiliki beberapa alur masuk tergantung pada peran Anda. Pilih yang paling sesuai untuk Anda.
              </p>
               <div className="mt-8 grid gap-8 md:grid-cols-2">
                 <Card className="text-left">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <LogIn className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Login Pengguna</CardTitle>
                        <CardContent className="p-0 pt-2">
                            Jika Anda adalah pengguna individu yang ingin memberikan ulasan atau melihat riwayat ulasan Anda, gunakan login ini. Akun ini dapat dibuat oleh Admin.
                             <Button asChild className="mt-4">
                              <Link href="/login/user">Lanjutkan sebagai Pengguna</Link>
                            </Button>
                        </CardContent>
                      </div>
                    </CardHeader>
                  </Card>
                   <Card className="text-left">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <LogIn className="h-6 w-6 text-primary" />
                      </div>
                       <div>
                        <CardTitle>Login Pegawai (Mode Kios)</CardTitle>
                        <CardContent className="p-0 pt-2">
                            Jika Anda adalah pegawai yang bertugas untuk membantu pasien memberikan ulasan secara langsung di unit layanan (mode kios), gunakan login ini.
                             <Button asChild className="mt-4">
                              <Link href="/login">Lanjutkan sebagai Pegawai</Link>
                            </Button>
                        </CardContent>
                      </div>
                    </CardHeader>
                  </Card>
              </div>
            </div>

             <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-foreground">Panduan & Pertanyaan Umum (FAQ)</h3>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                  Temukan jawaban atas pertanyaan umum tentang peran dan fungsi dalam aplikasi PharmaFeedback.
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
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
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PharmaFeedback. Semua hak dilindungi undang-undang.</p>
      </footer>
    </div>
  );
}
