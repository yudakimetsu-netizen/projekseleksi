require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware untuk mengizinkan akses dari luar dan membaca format JSON
app.use(cors());
app.use(express.json());

// Memanggil rute autentikasi
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rute dasar untuk tes
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API Proyek Seleksi!' });
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
