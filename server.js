// index.js
const express = require('express');
const app = express();
const testingRoutes = require('./routes/testingRoutes');
const path = require('path');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/loginRoutes');
const apiRoutes = require('./routes/apiRoutes');
const registerRoutes = require('./routes/registerRoutes');
const registerkaryawanRoutes = require('./routes/registerkaryawanRoutes');
const getkaryawanRoutes = require('./routes/getkaryawanRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const updateKaryawanRoutes = require('./routes/updatekaryawanRoutes');
const deactivateRoutes = require('./routes/deactivateRoutes');
// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// CORS middleware to allow requests from any origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routes middleware
app.use('/', testingRoutes);
app.use('/testingDb', testingRoutes);
app.use('/auth', loginRoutes);
app.use('/admin', registerRoutes);
app.use('/api', apiRoutes);
app.use('/karyawan', registerkaryawanRoutes);
//testing middleware
app.get('/protected', authMiddleware, (req, res) => {
    // Access the user data from req.user
    res.json({ user: req.user });
  });

//get karyawan
app.use('/karyawan', getkaryawanRoutes);

//update karyawan
app.use('/karyawan', updateKaryawanRoutes);

//deactivate karyawan
app.use('/karyawan', deactivateRoutes);

// Start the server
const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});