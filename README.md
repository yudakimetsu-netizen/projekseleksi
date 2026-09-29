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
);

## **Table Categori (untuk pengelompokan produk)**
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## **TABLE product (untuk data barang)**
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

## **Table order_items ( detail barang yang dibeli)**
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
