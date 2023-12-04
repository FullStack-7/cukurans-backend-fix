const User = require('../models/user')
const bcrypt = require('bcrypt');

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const users = await User.find();
            res.json({
              message: 'Berhasil mendapatkan semua pengguna',
              data: users,
            });
          } catch (error) {
            res.status(500).json({
              message: 'Gagal mendapatkan pengguna',
              error: error.message,
            });
        }
      
    },
    getByIdUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
              return res.status(404).json({
                message: 'Pengguna tidak ditemukan',
              });
            }
            res.json({
              message: 'Berhasil mendapatkan pengguna',
              data: user,
            });
          } catch (error) {
            res.status(500).json({
              message: 'Gagal mendapatkan pengguna',
              error: error.message,
            });
          }

    },
    addUser: async (req, res) => {
        try {
            const userData = req.body;
            const newUser = await User.create(userData);
            res.status(201).json({
              message: 'Berhasil membuat pengguna baru',
              data: newUser,
            });
          } catch (error) {
            res.status(500).json({
              message: 'Gagal membuat pengguna baru',
              error: error.message,
            });
          }
    },

    getUserTodos: async (req, res) =>{
        const {id} = req.params
        const todos = await Todo.find({userID: id})

        res.json(todos)
    },

    updateUser: async (req, res) => {
      try {
        const userId = req.params.id;
        let updatedData = req.body;
    
        if (req.body.password) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          updatedData.password = hashedPassword;
        }
    
        if (req.body.file) {
          const result = await cloudinary.uploader.upload(req.body.file, {
            folder: 'barber_online'
          });
          updatedData.foto_profil = result.secure_url;
        }
    
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser) {
          return res.status(404).json({
            message: 'Pengguna tidak ditemukan',
          });
        }
        
        res.json({
          message: 'Berhasil memperbarui profil pengguna',
          data: updatedUser,
        });
      } catch (error) {
        res.status(500).json({
          message: 'Gagal memperbarui profil pengguna',
          error: error.message,
        });
      }
    },

    deleteUserById: async (req, res) => {
        try {
          const userId = req.params.id;
          const deletedUser = await User.findByIdAndDelete(userId);
          if (!deletedUser) {
            return res.status(404).json({
              message: 'Pengguna tidak ditemukan',
            });
          }
          res.json({
            message: 'Berhasil menghapus pengguna',
            data: deletedUser,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal menghapus pengguna',
            error: error.message,
          });
        }
      },

      uploudFoto: async (req,res) => {
        try {
          const { userId } = req.params;
          const result = await cloudinary.uploader.upload(req.body.file, {
            folder: 'barber_online'
          });
          const updatedUser = await User.findByIdAndUpdate(userId, {
            foto_profil: result.secure_url
          }, { new: true });
          res.json(updatedUser);
        } catch (error) {
          res.status(500).json({ error: 'Gagal mengunggah foto profil' });
        }
      }
}