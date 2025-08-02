import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Pill, Smile, Clock } from "lucide-react";
import { PharmaFeedbackLogo } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PharmaFeedbackLogo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">PharmaFeedback</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login Pasien</Link>
          </Button>
          <Button asChild>
            <Link href="/admin">Login Admin</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Tingkatkan Layanan Farmasi, Bersama.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Umpan balik Anda sangat penting. Bantu RSUD Oto Iskandar Dinata meningkatkan layanan farmasinya dengan membagikan pengalaman Anda. Cepat, mudah, dan berdampak.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">Berikan Ulasan</Link>
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
                Ulasan Anda memberikan wawasan langsung yang mengarah pada perawatan yang lebih baik untuk semua orang.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Smile className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Tingkatkan Kualitas Pelayanan</CardTitle>
                </CardHeader>
                <CardContent>
                  Nilai keramahan dan profesionalisme staf untuk memastikan semua orang menerima perawatan yang sopan dan efektif.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Pill className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Tingkatkan Ketersediaan Obat</CardTitle>
                </CardHeader>
                <CardContent>
                  Umpan balik Anda membantu kami mengelola inventaris dengan lebih baik, memastikan obat-obatan penting selalu tersedia.
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
                  Bantu kami mengidentifikasi hambatan dan merampingkan proses kami untuk memberikan obat Anda lebih cepat.
                </CardContent>
              </Card>
            </div>
             <div className="mt-16 text-center">
              <h3 className="text-3xl font-bold text-foreground">Pengalaman Cerdas dan Terpandu</h3>
               <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Platform kami menggunakan AI untuk membuat pemberian umpan balik lebih sederhana dan lebih efektif.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 text-left p-4 rounded-lg max-w-md">
                      <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                      <p><span className="font-semibold">Saran Berbasis AI:</span> Dapatkan petunjuk cerdas berdasarkan umpan balik umum untuk membantu Anda mengartikulasikan pemikiran Anda.</p>
                  </div>
                   <div className="flex items-center gap-3 text-left p-4 rounded-lg max-w-md">
                      <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                      <p><span className="font-semibold">Proses Ulasan Terpandu:</span> Kami akan memandu Anda melalui setiap langkah untuk memastikan umpan balik Anda terperinci dan berdampak.</p>
                  </div>
              </div>
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
