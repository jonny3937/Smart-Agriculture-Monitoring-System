const fieldService = require('../services/fieldService');

async function create(req, res) {
    try {
        const { name, crop_type, planting_date, current_stage } = req.body;
        const field = await fieldService.createField(name, crop_type, planting_date, current_stage);
        res.status(201).json(field);
    } catch (err) { res.status(400).json({ message: err.message }); }
}

async function list(req, res) {
    try {
        const fields = await fieldService.getFields(req.user.id, req.user.role);
        res.json(fields);
    } catch (err) { res.status(500).json({ message: err.message }); }
}

async function assign(req, res) {
    try {
        const { id } = req.params;
        const { agent_id } = req.body;
        const field = await fieldService.assignField(id, agent_id);
        res.json(field);
    } catch (err) { res.status(400).json({ message: err.message }); }
}

async function updateStage(req, res) {
    try {
        const { id } = req.params;
        const { stage, notes } = req.body;
        const update = await fieldService.updateFieldStage(id, stage, notes, req.user.id);
        res.status(201).json(update);
    } catch (err) { res.status(400).json({ message: err.message }); }
}

async function listUpdates(req, res) {
    try {
        const { id } = req.params;
        const updates = await fieldService.getFieldUpdates(id);
        res.json(updates);
    } catch (err) { res.status(500).json({ message: err.message }); }
}

async function summary(req, res) {
    try {
        const data = await fieldService.getSummary();
        res.json(data);
    } catch (err) { res.status(500).json({ message: err.message }); }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, crop_type, planting_date, current_stage } = req.body;
        const field = await fieldService.updateField(id, name, crop_type, planting_date, current_stage);
        res.json(field);
    } catch (err) { res.status(400).json({ message: err.message }); }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        await fieldService.deleteField(id);
        res.json({ message: 'Field deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
}

module.exports = { create, list, assign, updateStage, listUpdates, summary, update, remove };
