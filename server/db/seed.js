const { pool } = require('./index');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('1234', salt);
        
        await pool.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ('Admin User', 'admin@gmail.com', $1, 'Admin') ON CONFLICT (email) DO NOTHING",
            [hash]
        );
        await pool.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ('Agent User', 'agent@gmail.com', $1, 'Field Agent') ON CONFLICT (email) DO NOTHING",
            [hash]
        );
        console.log('Demo users seeded.');
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}
seed();
