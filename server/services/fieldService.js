const { pool } = require('../db');

// Step 6: Computed Field Status Logic
// - 'Completed': If the current stage is 'Harvested'.
// - 'At Risk': If it's been more than 7 days since planting/last update and not Harvested.
// - 'Active': Otherwise.
function computeStatus(field) {
    if (field.current_stage.toLowerCase() === 'harvested') return 'Completed';
    const lastUpdate = new Date(field.last_update_time || field.planting_date);
    const diffTime = Math.abs(new Date() - lastUpdate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays > 7) return 'At Risk';
    return 'Active';
}

async function createField(name, crop_type, planting_date, current_stage) {
    const { rows } = await pool.query(
        'INSERT INTO fields (name, crop_type, planting_date, current_stage, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, crop_type, planting_date, current_stage, 'Active']
    );
    return rows[0];
}

async function getFields(userId, role) {
    let query = 'SELECT fields.*, (SELECT MAX(created_at) FROM field_updates WHERE field_id = fields.id) as last_update_time, users.name as agent_name FROM fields LEFT JOIN users ON fields.assigned_agent_id = users.id';
    let params = [];
    if (role === 'Field Agent') {
        query += ' WHERE assigned_agent_id = $1';
        params.push(userId);
    }
    query += ' ORDER BY fields.created_at DESC';
    const { rows } = await pool.query(query, params);
    
    // Apply computed status
    return rows.map(f => ({ ...f, status: computeStatus(f) }));
}

async function assignField(fieldId, agentId) {
    const { rows } = await pool.query(
        'UPDATE fields SET assigned_agent_id = $1 WHERE id = $2 RETURNING *',
        [agentId, fieldId]
    );
    return rows[0];
}

async function updateFieldStage(fieldId, stage, notes, updaterId, role) {
    if (role === 'Field Agent') {
        const { rows: fieldRows } = await pool.query('SELECT assigned_agent_id FROM fields WHERE id = $1', [fieldId]);
        if (fieldRows.length === 0 || fieldRows[0].assigned_agent_id !== updaterId) {
            throw new Error('Unauthorized: You are not assigned to this field');
        }
    }

    await pool.query('BEGIN');
    try {
        await pool.query(
            'UPDATE fields SET current_stage = $1 WHERE id = $2',
            [stage, fieldId]
        );
        const { rows } = await pool.query(
            'INSERT INTO field_updates (field_id, stage, notes, updater_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [fieldId, stage, notes, updaterId]
        );
        await pool.query('COMMIT');
        return rows[0];
    } catch (e) {
        await pool.query('ROLLBACK');
        throw e;
    }
}

async function getFieldUpdates(fieldId, userId, role) {
    if (role === 'Field Agent') {
        const { rows: fieldRows } = await pool.query('SELECT assigned_agent_id FROM fields WHERE id = $1', [fieldId]);
        if (fieldRows.length === 0 || fieldRows[0].assigned_agent_id !== userId) {
            throw new Error('Unauthorized: You are not assigned to this field');
        }
    }

    const { rows } = await pool.query(
        `SELECT u.*, us.name, us.role 
         FROM field_updates u 
         LEFT JOIN users us ON u.updater_id = us.id 
         WHERE u.field_id = $1 
         ORDER BY u.created_at DESC`,
        [fieldId]
    );
    return rows;
}

async function getSummary() {
    const fields = await getFields(null, 'Admin');
    const total = fields.length;
    const active = fields.filter(f => f.status === 'Active').length;
    const atRisk = fields.filter(f => f.status === 'At Risk').length;
    const completed = fields.filter(f => f.status === 'Completed').length;
    
    return { total, active, atRisk, completed };
}

async function updateField(fieldId, name, crop_type, planting_date, current_stage) {
    const { rows } = await pool.query(
        'UPDATE fields SET name = $1, crop_type = $2, planting_date = $3, current_stage = $4 WHERE id = $5 RETURNING *',
        [name, crop_type, planting_date, current_stage, fieldId]
    );
    return rows[0];
}

async function deleteField(fieldId) {
    const { rows } = await pool.query('DELETE FROM fields WHERE id = $1 RETURNING id', [fieldId]);
    return rows[0];
}

module.exports = { createField, getFields, assignField, updateFieldStage, getFieldUpdates, getSummary, updateField, deleteField };
