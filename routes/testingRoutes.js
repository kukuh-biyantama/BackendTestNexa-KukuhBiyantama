// routes/testingRoutes.js
const express = require('express');
const router = express.Router();
const testingController = require('../controllers/testingController');
const databasetestingController = require('../controllers/databasetestingController');
// Route handler for the root path '/'
router.get('/', testingController.getTesting);
router.get('/testingDb', databasetestingController.getUsers)

module.exports = router;