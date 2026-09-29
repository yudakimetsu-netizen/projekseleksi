const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Logika Register
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // PostgreSQL menggunakan $1, $2, $3, $4
        const query = 'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)';
        await db.query(query, [username, email, hashedPassword, role || 'user']);

        res.status(201).json({ message: 'User berhasil didaftarkan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logika Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // PostgreSQL menggunakan $1
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const users = result.rows; // Data diambil dari .rows
        
        if (users.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Password salah' });

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.json({ message: 'Login berhasil', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};