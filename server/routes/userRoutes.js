const express = require('express');
const { register, login, logout, getAgents, updateProfile } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register); 
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, (req, res) => res.json(req.user));
router.get('/agents', authenticate, authorize(['Admin']), getAgents);
router.put('/profile', authenticate, updateProfile);

module.exports = router;
