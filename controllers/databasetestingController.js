const connection = require('../env/connectionDatabase');

const getUsers = (req, res) => {
    connection.query('SELECT * FROM karyawan', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
};

module.exports = {
    getUsers,
};