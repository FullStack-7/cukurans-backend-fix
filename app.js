const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();

const allRoutes = require('./routes');
const db = require('./config/db');

(async () => {
  try {
    await db;
    console.log('berhasil terhubung ke database');
    
    app.get('/', (req, res) => {
      res.send('Hello');
    });

    app.listen(PORT, () => {
      console.log(`Aplikasi berjalan pada port ${PORT}`);
    });

    app.use(cors());
    app.use(express.json());
    app.use(allRoutes);
  } catch (err) {
    console.log('gagal terhubung ke database', err);
  }
})();
