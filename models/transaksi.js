const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const transaksiSchema = new Schema({
  idBarang: {
    type: objectId,
  },
  idUser: {
    type: objectId,
  },
  jumlah: {
    type: Number,
  },
  harga: {
    type: Number,
  },
  total: {
    type: Number,
  },
  tanggal: {
    type: String,
  },
  jamMulai: {
    type: String,
  },
  jamAkhir: {
    type: String,
  },
  username: {
    type: String, // Menyimpan username pengguna
  },
  phoneNumber: {
    type: String, // Menyimpan nomor telepon pengguna
  },
  status: {
    type: Number,
    default: 0,
  },
  buktiPembayaran: {
    type: String,
  },
});

module.exports = mongoose.model("transaksi", transaksiSchema);
