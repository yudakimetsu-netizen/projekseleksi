# Aplikasi Manajemen Toko (Contoh)

## 1. Penjelasan Aplikasi
Aplikasi ini adalah backend API sederhana yang digunakan untuk mengelola data produk, kategori, dan transaksi pesanan. Aplikasi ini juga dilengkapi dengan sistem autentikasi pengguna dan hak akses (role) untuk membedakan antara Admin dan Pengguna Biasa.

## 2. Techstack yang Digunakan
- Bahasa Pemrograman: Node.js
- Framework: Express.js
- Database: MySQL

## 3. Petunjuk Instalasi
1. Clone repository ini
2. Jalankan npm install
3. Buat database baru di MySQL dengan nama db_toko
4. Import file database.sql (ada di bawah) ke dalam database tersebut
5. Konfigurasi file .env (sesuaikan host, user, password, dan nama database)
6. Jalankan aplikasi dengan perintah npm start

## 4. Struktur Database (SQL)

Berikut adalah skema database yang digunakan. Anda bisa menyalin kode SQL di bawah ini dan menyimpannya sebagai file database.sql.

### A. Tabel users (Untuk Autentikasi & Permission)
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
