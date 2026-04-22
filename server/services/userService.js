const { pool } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(name, email, password, role) {
    if (role === 'Admin') {
        if (email !== 'mainamwangi@gmail.com') {
            throw new Error('Only mainamwangi@gmail.com is allowed to register as an Admin.');
        }
        const { rows: adminRows } = await pool.query("SELECT id FROM users WHERE role = 'Admin'");
        if (adminRows.length > 0) {
            throw new Error('An Admin is already registered. Only one admin is allowed.');
        }
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const { rows } = await pool.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
        [name, email, hashedPassword, role]
    );
    return rows[0];
}

async function loginUser(email, password) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) throw new Error('Invalid credentials');
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) throw new Error('Invalid credentials');
    
    const token = jwt.sign(
        { id: user.id, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

async function getAllAgents() {
     // Fetch all users for admin management, ordered by role then name
     const { rows } = await pool.query('SELECT id, name, email, role FROM users ORDER BY role DESC, name ASC');
     return rows;
}


async function updateUserProfile(userId, name, password) {
    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const { rows } = await pool.query(
            'UPDATE users SET name = $1, password_hash = $2 WHERE id = $3 RETURNING id, name, email, role',
            [name, hashedPassword, userId]
        );
        return rows[0];
    } else {
        const { rows } = await pool.query(
            'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email, role',
            [name, userId]
        );
        return rows[0];
    }
}

module.exports = { registerUser, loginUser, getAllAgents, updateUserProfile };
