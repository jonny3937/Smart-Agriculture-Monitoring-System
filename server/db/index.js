const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString && !connectionString.includes('localhost') 
    ? { rejectUnauthorized: false } 
    : false
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};