const Service = require('../models/service')

module.exports = {
    getAllServices: async (req, res) => {
        try {
          const services = await Service.find();
          res.json({
            message: 'Berhasil mendapatkan semua layanan',
            data: services,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal mendapatkan layanan',
            error: error.message,
          });
        }
      },
    
      getServiceById: async (req, res) => {
        try {
          const serviceId = req.params.id;
          const service = await Service.findById(serviceId);
          if (!service) {
            return res.status(404).json({
              message: 'Layanan tidak ditemukan',
            });
          }
          res.json({
            message: 'Berhasil mendapatkan layanan',
            data: service,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal mendapatkan layanan',
            error: error.message,
          });
        }
      },
    
      createService: async (req, res) => {
        try {
          const serviceData = req.body;
          const newService = await Service.create(serviceData);
          res.status(201).json({
            message: 'Berhasil membuat layanan baru',
            data: newService,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal membuat layanan baru',
            error: error.message,
          });
        }
      },
    
      updateServiceById: async (req, res) => {
        try {
          const serviceId = req.params.id;
          const updatedData = req.body;
          const updatedService = await Service.findByIdAndUpdate(serviceId, updatedData, { new: true });
          if (!updatedService) {
            return res.status(404).json({
              message: 'Layanan tidak ditemukan',
            });
          }
          res.json({
            message: 'Berhasil memperbarui layanan',
            data: updatedService,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal memperbarui layanan',
            error: error.message,
          });
        }
      },
    
      deleteServiceById: async (req, res) => {
        try {
          const serviceId = req.params.id;
          const deletedService = await Service.findByIdAndDelete(serviceId);
          if (!deletedService) {
            return res.status(404).json({
              message: 'Layanan tidak ditemukan',
            });
          }
          res.json({
            message: 'Berhasil menghapus layanan',
            data: deletedService,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal menghapus layanan',
            error: error.message,
          });
        }
      },

      updateData: async (req, res) => {
        const { id } = req.params;
        const { name, description, price, image } = req.body;

        try {
          const service = await Service.findByIdAndUpdate(id, { name, description, price, image }, { new: true });

          if (!service) {
            return res.status(404).json({ message: 'Service tidak ditemukan' });
          }

          res.status(200).json({ service });
        } catch (error) {
          res.status(500).json({ message: 'Gagal melakukan update pada service', error: error.message });
        }
            }
  }