const express = require('express');
const userRoutes = require('./userRoutes');
const fieldRoutes = require('./fieldRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ message: 'API is healthy' });
});

router.use('/users', userRoutes);
router.use('/fields', fieldRoutes);

module.exports = router;
