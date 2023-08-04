const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt'); // Import the jwt module
const { executeQuery } = require('../env/connectionDatabase');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Insert this function to handle token insertion
const storeToken = async (token, userId) => {
    try {
        // Convert the token to a string explicitly
        const tokenString = token.toString();
        const currentTime = new Date();

        // Set token expiration time (1 hour from the current time)
        const expirationTime = new Date(currentTime.getTime() + 60 * 60 * 1000);

        await executeQuery(
            'INSERT INTO admin_token (id_admin, token, expired_at) VALUES (?, ?, ?)',
            [userId, tokenString, expirationTime]
        );
    } catch (err) {
        console.error('Error storing token in the database:', err);
        throw err;
    }
};

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await executeQuery('SELECT * FROM admin WHERE username = ?', [username]);
        if (!users || users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        const hashedPassword = user.password.toString(); // Ensure user.password is a string

        const passwordMatch = await bcrypt.compare(password.toString(), hashedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.generateToken({ userId: user.id, username: user.username }); // Use jwt.generateToken

        // Store the token in the database
        await storeToken(token, user.id);

        res.json({ token });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
