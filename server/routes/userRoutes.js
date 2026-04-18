const express = require('express');
const { register, login, getAgents, updateProfile } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register); 
router.post('/login', login);
router.get('/agents', authenticate, authorize(['Admin']), getAgents);
router.put('/profile', authenticate, updateProfile);

module.exports = router;
