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
-   **ORM**: Prisma (siap untuk diintegrasikan)
-   **Validasi Formulir**: React Hook Form & Zod
-   **Visualisasi Data**: Recharts

## Struktur Proyek

-   `src/app`: Rute utama aplikasi (App Router).
-   `src/components`: Komponen React yang dapat digunakan kembali.
-   `src/lib`: Logika bisnis, konstanta, dan fungsi utilitas (termasuk *server actions* untuk Prisma).
-   `prisma`: Konfigurasi dan skema database Prisma.
-   `docker-compose.yml` & `Dockerfile`: Konfigurasi untuk menjalankan aplikasi dan database menggunakan Docker.

## Panduan Menjalankan Proyek

Proyek ini dapat dijalankan dalam dua mode: mode pengembangan lokal standar atau menggunakan Docker.

### Cara 1: Pengembangan Lokal Standar

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Jalankan Server Pengembangan**:
    ```bash
    npm run dev
    ```

Aplikasi akan berjalan di `http://localhost:9002`.

### Cara 2: Menggunakan Docker (Direkomendasikan untuk Deployment)

Ini adalah cara termudah untuk menjalankan aplikasi dan database MySQL tanpa perlu menginstalnya secara manual di mesin Anda.

1.  **Pastikan Docker Terinstal**: Anda harus memiliki Docker dan Docker Compose di sistem Anda.
2.  **Jalankan Docker Compose**:
    ```bash
    docker-compose up --build
    ```
    Perintah ini akan membuat *image* untuk aplikasi Anda, mengunduh *image* MySQL, dan menjalankan keduanya. Aplikasi akan dapat diakses di `http://localhost:3000`.

## Integrasi Database Prisma & MySQL

Proyek ini telah dikonfigurasi untuk menggunakan Prisma ORM dengan database MySQL.

1.  **Konfigurasi Koneksi**:
    Pastikan file `.env` Anda sudah berisi string koneksi yang benar. Jika menggunakan Docker Compose, konfigurasi bawaan sudah sesuai.
    ```
    DATABASE_URL="mysql://user:password@db:3306/layanan_review"
    ```
    Jika menjalankan secara lokal tanpa Docker, ganti `db` dengan `localhost` atau `127.0.0.1`.

2.  **Jalankan Migrasi Database**:
    Perintah ini akan membuat tabel `User` dan `Review` di database Anda berdasarkan skema di `prisma/schema.prisma`.
    ```bash
    # Jika menggunakan Docker, jalankan di container web:
    # docker-compose exec web npm run prisma:migrate
    
    # Jika menjalankan lokal:
    npm run prisma:migrate
    ```
    Prisma mungkin akan meminta Anda memberi nama untuk migrasi ini, ketik saja `init` dan tekan Enter.

3.  **Isi Data Awal (Seeding)**:
    Perintah ini akan menjalankan skrip `prisma/seed.ts` untuk mengisi database dengan pengguna dan ulasan demo.
    ```bash
    # Jika menggunakan Docker:
    # docker-compose exec web npm run prisma:seed

    # Jika menjalankan lokal:
    npm run prisma:seed
    ```

Setelah langkah-langkah ini, aplikasi Anda akan sepenuhnya berjalan menggunakan database MySQL.

## Kredensial Login Demo

-   **Admin Sistem**:
    -   Email: `admin@sim.rs`
    -   Password: `123456`
-   **Pengguna Individu**:
    -   Buat pengguna baru melalui menu "Kelola Pengguna" di dasbor admin, atau gunakan kredensial berikut dari data *seed*:
    -   Email: `budi.santoso@example.com`, Password: `password123`
    -   Email: `ani.yudhoyono@example.com`, Password: `password123`
-   **Pegawai (Mode Kios)**:
    -   Login dengan email yang memiliki format `pegawai.[kata_kunci_unit]@sim.rs`. Contoh:
    -   `pegawai.farmasi@sim.rs` (untuk Instalasi Farmasi)
    -   `pegawai.radiologi@sim.rs` (untuk Instalasi Radiologi)
    -   Kata sandi untuk pegawai tidak divalidasi dalam mode kios ini untuk kemudahan demo.
