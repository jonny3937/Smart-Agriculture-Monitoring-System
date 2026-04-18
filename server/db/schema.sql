-- Drop tables if they exist to start fresh during initialization
DROP TABLE IF EXISTS field_updates;
DROP TABLE IF EXISTS fields;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Admin', 'Field Agent')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fields (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    crop_type VARCHAR(255) NOT NULL,
    planting_date DATE NOT NULL,
    current_stage VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Active',
    assigned_agent_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE field_updates (
    id SERIAL PRIMARY KEY,
    field_id INTEGER REFERENCES fields(id) ON DELETE CASCADE,
    stage VARCHAR(100) NOT NULL,
    notes TEXT,
    updater_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
