const Barber = require('../models/barber');



module.exports = {
    getAllBarbers: async (req, res) => {
        try {
          const barbers = await Barber.find().populate('userId services');
          res.json({
            message: 'Berhasil mendapatkan semua barber',
            data: barbers,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal mendapatkan barber',
            error: error.message,
          });
        }
      },
    
      getBarberById: async (req, res) => {
        try {
          const barberId = req.params.id;
          const barber = await Barber.findById(barberId).populate('userId services');
          if (!barber) {
            return res.status(404).json({
              message: 'Barber tidak ditemukan',
            });
          }
          res.json({
            message: 'Berhasil mendapatkan barber',
            data: barber,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal mendapatkan barber',
            error: error.message,
          });
        }
      },
    
      createBarber: async (req, res) => {
        try {
          const barberData = req.body;
          const newBarber = await Barber.create(barberData);
          res.status(201).json({
            message: 'Berhasil membuat barber baru',
            data: newBarber,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal membuat barber baru',
            error: error.message,
          });
        }
      },
    
      updateBarberById: async (req, res) => {
        try {
          const barberId = req.params.id;
          const updatedData = req.body;
          const updatedBarber = await Barber.findByIdAndUpdate(barberId, updatedData, { new: true }).populate('userId services');
          if (!updatedBarber) {
            return res.status(404).json({
              message: 'Barber tidak ditemukan',
            });
          }
          res.json({
            message: 'Berhasil memperbarui barber',
            data: updatedBarber,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal memperbarui barber',
            error: error.message,
          });
        }
      },
    
      deleteBarberById: async (req, res) => {
        try {
          const barberId = req.params.id;
          const deletedBarber = await Barber.findByIdAndDelete(barberId);
          if (!deletedBarber) {
            return res.status(404).json({
              message: 'Barber tidak ditemukan',
            });
          }
          res.json({
            message: 'Berhasil menghapus barber',
            data: deletedBarber,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal menghapus barber',
            error: error.message,
          });
        }
      },
}
