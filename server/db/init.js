const fs = require('fs');
const path = require('path');
const { pool } = require('./index');

async function initDb() {
  console.log('Initializing database...');
  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await pool.query(schemaSql);
    console.log('Database initialized successfully with base models.');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initDb();
