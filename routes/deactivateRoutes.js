const express = require('express');
const { executeQuery } = require('../env/connectionDatabase');
const { authenticateToken } = require('../helpers/jwt');

const router = express.Router();

// Route to deactivate an employee
router.put('/deactivatekaryawan/:nip', authenticateToken, async (req, res) => {
  const { nip } = req.params;

  try {
    // Sanitize the input to prevent SQL injection and handle special characters
    const sanitizedNIP = nip.replace(/'/g, "''");

    // Query the database to update the employee status to 9 (deactivated) based on NIP
    const query = `
      UPDATE karyawan
      SET status = 9
      WHERE nip = ?
    `;
    const [result] = await executeQuery(query, [sanitizedNIP]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deactivated successfully' });
  } catch (err) {
    console.error('Error deactivating employee:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
