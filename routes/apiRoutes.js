// routes/otherRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/protected-route', authMiddleware, (req, res) => {
    // Accessible only with a valid token
    res.json({ message: 'This is a protected route!' });
});

module.exports = router;
