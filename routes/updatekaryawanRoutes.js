const express = require('express');
const { executeQuery } = require('../env/connectionDatabase');
const { authenticateToken } = require('../helpers/jwt');

const router = express.Router();

// Route to update employee data
router.put('/updatekaryawan/:nip', authenticateToken, async (req, res) => {
  const { nip } = req.params;
  const { nama, alamat, tgl_lahir } = req.body;

  try {
    // Validate that the required fields are not empty
    if (!nama || !alamat || !tgl_lahir) {
      return res.status(400).json({ error: 'Nama, Alamat, and Tanggal Lahir are required fields' });
    }

    // Sanitize the input to prevent SQL injection and handle special characters
    const sanitizedNama = nama.replace(/'/g, "''");
    const sanitizedAlamat = alamat.replace(/'/g, "''");
    const sanitizedTanggalLahir = tgl_lahir.replace(/'/g, "''");

    // Query the database to update the employee data based on NIP
    const query = `
      UPDATE karyawan
      SET nama = ?, alamat = ?, tgl_lahir = ?
      WHERE nip = ?
    `;
    const [result] = await executeQuery(query, [sanitizedNama, sanitizedAlamat, sanitizedTanggalLahir, nip]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee data updated successfully' });
  } catch (err) {
    console.error('Error updating employee data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
