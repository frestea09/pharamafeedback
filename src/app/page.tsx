import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Users, Clock, Hospital } from "lucide-react";
import { LoginFAQ } from "@/components/organisms/admin/LoginFAQ";
import { generalFaqItems } from "@/lib/constants";

const features = [
  {
    icon: Smile,
    title: "Tingkatkan Kualitas Pelayanan",
    description:
      "Nilai keramahan dan profesionalisme staf untuk memastikan semua orang menerima pelayanan yang sopan dan efektif.",
  },
  {
    icon: Users,
    title: "Pastikan Ketersediaan Obat",
    description:
      "Umpan balik Anda membantu kami mengelola stok obat agar selalu tersedia saat dibutuhkan.",
  },
  {
    icon: Clock,
    title: "Kurangi Waktu Tunggu",
    description:
      "Bantu kami mengidentifikasi hambatan dan merampingkan proses kami untuk melayani Anda lebih cepat.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Hospital className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            LayananReview RSUD
          </h1>
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
        <section className="container mx-auto px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Tingkatkan Kualitas Layanan Rumah Sakit, Bersama.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Umpan balik Anda sangat penting. Bantu kami meningkatkan semua unit
            layanan di RSUD Oto Iskandar Dinata dengan membagikan pengalaman
            Anda.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">Login Pegawai (Kios)</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login/user">Login Pengguna Individu</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="bg-card py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground">
                Mengapa Umpan Balik Anda Penting
              </h3>
              <p className="mt-2 text-muted-foreground">
                Ulasan Anda memberikan wawasan langsung yang mengarah pada
                pelayanan yang lebih baik di seluruh unit.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {features.map((feature, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{feature.description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <LoginFAQ
              title="Panduan Umum & Pertanyaan"
              items={generalFaqItems}
            />
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} LayananReview RSUD. Semua hak
          dilindungi undang-undang.
        </p>
      </footer>
    </div>
  );
}
