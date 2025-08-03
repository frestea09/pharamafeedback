# PharmaFeedback - Aplikasi Ulasan Layanan Rumah Sakit

Aplikasi web modern yang dibangun dengan Next.js dan TypeScript untuk mengumpulkan dan menganalisis umpan balik pasien di berbagai unit layanan rumah sakit. Aplikasi ini menyediakan portal terpisah untuk admin, pengguna, dan mode kios untuk pegawai.

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
-   **Manajemen State**: Zustand
-   **Validasi Formulir**: React Hook Form & Zod
-   **Visualisasi Data**: Recharts

## Struktur Proyek

-   `src/app`: Rute utama aplikasi (App Router).
    -   `/`: Halaman utama.
    -   `/admin`: Grup rute untuk dasbor admin.
    -   `/dashboard`: Grup rute untuk dasbor pengguna.
    -   `/login`: Halaman login untuk berbagai peran.
-   `src/components`: Komponen React yang dapat digunakan kembali (atom, molekul, organisme).
-   `src/lib`: Logika bisnis, konstanta, dan fungsi utilitas.
-   `src/store`: Pengelolaan state global dengan Zustand (untuk ulasan dan pengguna).

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

## Kredensial Login Demo

-   **Admin Sistem**:
    -   Email: `admin@sim.rs`
    -   Password: `123456`
-   **Pengguna Individu**:
    -   Buat pengguna baru melalui menu "Kelola Pengguna" di dasbor admin.
-   **Pegawai (Mode Kios)**:
    -   Email: `pegawai.[nama_unit]@sim.rs` (cth: `pegawai.farmasi@sim.rs`)
    -   Password: `pegawai123`
