const { Client } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

async function createDatabase() {
    const defaultDbUrl = process.env.DATABASE_URL.replace('/smartseason', '/postgres');
    const client = new Client({ connectionString: defaultDbUrl });
    try {
        await client.connect();
        const res = await client.query("SELECT datname FROM pg_catalog.pg_database WHERE datname = 'smartseason'");
        if (res.rowCount === 0) {
            console.log('Creating database smartseason...');
            await client.query('CREATE DATABASE smartseason');
            console.log('Database smartseason created.');
        } else {
            console.log('Database smartseason already exists.');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await client.end();
    }
}
createDatabase();
