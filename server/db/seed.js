const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function seed() {
    try {
        const salt = await bcrypt.genSalt(10);
        
        // Demo Admin
        const adminHash = await bcrypt.hash('maina', salt);
        await pool.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ('Maina Mwangi', 'mainamwangi@gmail.com', $1, 'Admin') ON CONFLICT (email) DO NOTHING",
            [adminHash]
        );

        // Demo Agent
        const agentHash = await bcrypt.hash('maina_me', salt);
        await pool.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ('Maina Agent', 'maina@gmail.com', $1, 'Field Agent') ON CONFLICT (email) DO NOTHING",
            [agentHash]
        );

        console.log('✅ Demo users (Maina Admin & Agent) seeded successfully.');
    } catch (e) {
        console.error('❌ Seeding failed:', e.message);
    } finally {
        await pool.end();
    }
}
seed();
