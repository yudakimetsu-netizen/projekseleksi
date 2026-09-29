const jwt = require('jsonwebtoken');

// 1. Authentication: Cek apakah user membawa Token yang valid
const verifyToken = (req, res, next) => {
    // Token biasanya dikirim di header 'Authorization: Bearer <token>'
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });

    try {
        // Memverifikasi token menggunakan kunci rahasia
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified; // Menyimpan data user ke dalam request
        next(); // Lanjut ke fungsi berikutnya
    } catch (error) {
        res.status(400).json({ message: 'Token tidak valid' });
    }
};

// 2. Permission: Cek apakah Role user diizinkan mengakses rute tertentu
const authorizeRole = (...roles) => {
    return (req, res, next) => {
        // req.user didapat dari verifyToken
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Akses ditolak. Anda tidak memiliki izin.' });
        }
        next();
    };
};

module.exports = { verifyToken, authorizeRole };
