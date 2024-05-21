const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lapanganSchema = new Schema({
  kategori: {
    type: String,
  },
  nama: {
    type: String, // Jika nama lapangan harus diisi
  },
  tipe: {
    type: String, // Jika tipe lapangan harus diisi, misalnya "Futsal", "Basketball", dll.
  },
  harga: {
    type: Number, // Harga lapangan
  },
  gambar: {
    type: String,
    // URL gambar lapangan
  },
});

module.exports = mongoose.model("lapangan", lapanganSchema);
