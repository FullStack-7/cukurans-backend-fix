const mongoose = require('mongoose');

const kontakSchema = new mongoose.Schema({
    email: String,
    subjek: String,
    pesan: String
});

const Kontak = mongoose.model('Kontak', kontakSchema);

module.exports = Kontak;
