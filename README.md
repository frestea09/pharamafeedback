# LayananReview - Aplikasi Ulasan Layanan RSUD Oto Iskandar Dinata

Aplikasi web modern yang dibangun dengan Next.js dan TypeScript untuk mengumpulkan dan menganalisis umpan balik pasien di berbagai unit layanan RSUD Oto Iskandar Dinata. Aplikasi ini menyediakan portal terpisah untuk admin, pengguna, dan mode kios untuk pegawai.

## Fitur Utama

-   **Tiga Peran Pengguna**: Portal yang berbeda untuk Admin, Pengguna Individu, dan Pegawai (Mode Kios).
-   **Dasbor Analitik**: Admin dapat melihat data ulasan secara visual, termasuk peringkat rata-rata dan distribusi.
-   **Manajemen Ulasan & Pengguna**: Admin dapat melihat, memfilter, dan menghapus ulasan serta mengelola akun pengguna.
-   **Laporan Profesional**: Fitur untuk mengekspor data ulasan ke format yang siap cetak atau PDF.
-   **Formulir Ulasan Interaktif**: Pengguna dapat memberikan peringkat bintang, memilih kecepatan layanan, dan memberikan komentar.
-   **Mode Kios**: Pegawai dapat login untuk memulai sesi ulasan anonim bagi pasien di tempat.
-   **Desain Responsif**: Antarmuka yang bersih dan modern, dapat diakses di berbagai perangkat.

## Teknologi yang Digunakan

-   **Framework**: Next.js (dengan App Router)
-   **Bahasa**: TypeScript
-   **Styling**: Tailwind CSS & ShadCN/UI
-   **Manajemen State**: Zustand (untuk data demo)
-   **ORM**: Prisma (siap untuk diintegrasikan)
-   **Validasi Formulir**: React Hook Form & Zod
-   **Visualisasi Data**: Recharts

## Struktur Proyek

-   `src/app`: Rute utama aplikasi (App Router).
-   `src/components`: Komponen React yang dapat digunakan kembali.
-   `src/lib`: Logika bisnis, konstanta, dan fungsi utilitas.
-   `src/store`: Pengelolaan state global dengan Zustand (digunakan untuk demo).
-   `prisma`: Konfigurasi dan skema database Prisma.

## Memulai

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Jalankan server pengembangan**:
    ```bash
    npm run dev
    ```

Aplikasi akan berjalan di `http://localhost:9002`.

## Integrasi Prisma (Langkah Selanjutnya)

Proyek ini telah disiapkan untuk menggunakan Prisma ORM. Saat ini, aplikasi masih berjalan menggunakan data sementara dari Zustand. Untuk beralih ke database:

1.  **Siapkan Database Anda**: Pastikan Anda memiliki server database (misalnya PostgreSQL) yang berjalan.
2.  **Konfigurasi `.env`**: Ubah variabel `DATABASE_URL` di file `.env` agar sesuai dengan string koneksi database Anda.
3.  **Jalankan Migrasi**: Terapkan skema database dengan menjalankan perintah berikut:
    ```bash
    npm run prisma:migrate
    ```
    Ini akan membuat tabel `User` dan `Review` di database Anda.
4.  **Implementasikan Prisma Client**: Ganti logika di `src/store/*.ts` untuk menggunakan Prisma Client untuk mengambil dan memanipulasi data dari database Anda, bukan dari array statis.

## Kredensial Login Demo

-   **Admin Sistem**:
    -   Email: `admin@sim.rs`
    -   Password: `123456`
-   **Pengguna Individu**:
    -   Buat pengguna baru melalui menu "Kelola Pengguna" di dasbor admin.
-   **Pegawai (Mode Kios)**:
    -   Email: `pegawai.[nama_unit]@sim.rs` (cth: `pegawai.farmasi@sim.rs`)
    -   Password: `pegawai123`
