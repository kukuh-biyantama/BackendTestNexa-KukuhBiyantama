const express = require('express');
const { executeQuery } = require('../env/connectionDatabase');
const { authenticateToken } = require('../helpers/jwt');

const router = express.Router();

// Middleware to validate and sanitize request parameters
const validateGetKaryawanParams = (req, res, next) => {
  const { keyword, start, count } = req.query;

  if (!keyword || keyword.trim().length === 0 || !start || !count) {
    return res.status(400).json({ error: 'All parameters are required' });
  }

  const startInt = parseInt(start);
  const countInt = parseInt(count);

  if (isNaN(startInt) || isNaN(countInt) || startInt < 0 || countInt <= 0) {
    return res.status(400).json({ error: 'Invalid start or count parameter' });
  }

  next();
};

// Route to get list of employees
router.get('/getkaryawan', authenticateToken, validateGetKaryawanParams, async (req, res) => {
  const { keyword, start, count } = req.query;

  try {
    // Sanitize the keyword to prevent SQL injection and handle special characters
    const sanitizedKeyword = keyword.replace(/[_%]/g, '\\$&') + '%';

    // Query the database to get employees matching the keyword and limit the results with pagination
    const query = `
      SELECT * FROM karyawan
      WHERE nama LIKE ? ESCAPE '\\\\'
      ORDER BY nip
      LIMIT ?, ?
    `;
    const [employees] = await executeQuery(query, [sanitizedKeyword, parseInt(start), parseInt(count)]);

    if (employees.length === 0) {
      return res.status(404).json({ error: 'No employees found' });
    }

    res.json(employees);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
