const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const migrate = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL CHECK (role IN ('Admin', 'Field Agent')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS fields (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                crop_type VARCHAR(255) NOT NULL,
                planting_date DATE NOT NULL,
                current_stage VARCHAR(100) NOT NULL,
                status VARCHAR(50) DEFAULT 'Active',
                assigned_agent_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS field_updates (
                id SERIAL PRIMARY KEY,
                field_id INTEGER REFERENCES fields(id) ON DELETE CASCADE,
                stage VARCHAR(100) NOT NULL,
                notes TEXT,
                updater_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Database tables created successfully!');
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    } finally {
        await pool.end();
    }
};

migrate();