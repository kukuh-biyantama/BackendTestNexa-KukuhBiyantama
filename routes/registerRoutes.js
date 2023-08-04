// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const { executeQuery } = require('../env/connectionDatabase');

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register', { error: null });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists in the database
        const [existingUser] = await executeQuery('SELECT * FROM admin WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password before storing it in the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the admin table
        const [result] = await executeQuery('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hashedPassword]);

        const newUserId = result.insertId;

        res.json({ message: 'User created successfully', userId: newUserId });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
