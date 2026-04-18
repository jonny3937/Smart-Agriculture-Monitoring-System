const express = require('express');
const { create, list, assign, updateStage, listUpdates, summary, update, remove } = require('../controllers/fieldController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authenticate);

router.get('/summary', authorize(['Admin']), summary);
router.get('/', list);
router.post('/', authorize(['Admin']), create);
router.put('/:id/assign', authorize(['Admin']), assign);
router.post('/:id/updates', authorize(['Admin', 'Field Agent']), updateStage);
router.get('/:id/updates', authorize(['Admin', 'Field Agent']), listUpdates);
router.put('/:id', authorize(['Admin']), update);
router.delete('/:id', authorize(['Admin']), remove);

module.exports = router;
