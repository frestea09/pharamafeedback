
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Users, Clock, TestTube, LogIn } from "lucide-react";

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
                            Jika Anda adalah pengguna individu yang ingin memberikan ulasan atau melihat riwayat ulasan Anda, gunakan login ini.
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
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PharmaFeedback. Semua hak dilindungi undang-undang.</p>
      </footer>
    </div>
  );
}
