const { pool } = require('../server/db/index');

async function removeAdmin() {
    try {
        console.log('Searching for Admin users to remove...');
        const result = await pool.query("DELETE FROM users WHERE role = 'Admin' RETURNING email");
        if (result.rowCount > 0) {
            console.log(`Successfully removed ${result.rowCount} admin(s):`, result.rows.map(r => r.email).join(', '));
            console.log('You can now register your new Admin account.');
        } else {
            console.log('No Admin users found to remove.');
        }
    } catch (error) {
        console.error('Error removing admin:', error);
    } finally {
        await pool.end();
    }
}

removeAdmin();
