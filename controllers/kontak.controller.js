const Kontak = require('../models/kontak')

module.exports = {
    getAllKontak: async (req,res) => {
        try {
            const kontaks = await Kontak.find();
            res.json({
              message: 'Berhasil mendapatkan semua pengguna',
              data: kontaks
            });
          } catch (error) {
            res.status(500).json({
              message: 'Gagal mendapatkan pengguna',
              error: error.message,
            });
        }
    },

    addKontak: async (req,res) => {
        try {
            const kontakData = req.body;
            const newKontak = await Kontak.create(kontakData);
            res.status(201).json({
              message: 'Berhasil membuat pengguna baru',
              data: newKontak,
            });
          } catch (error) {
            res.status(500).json({
              message: 'Gagal membuat pengguna baru',
              error: error.message,
            });
          }
    }
}