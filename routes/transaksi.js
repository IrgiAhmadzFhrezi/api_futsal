const router = require("express").Router();
const transaksiController = require("../controllers/transaksiController");
const uploadConfig = require("../uploadConfig");
const fields = uploadConfig.upload.fields([
  {
    name: "buktiPembayaran",
    maxCount: 1,
  },
]);

// Rute untuk membuat transaksi baru
router.post("/create", fields, (req, res) => {
  transaksiController
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Rute untuk mengunggah bukti pembayaran pada transaksi tertentu
router.put("/upload-bukti/:id", fields, (req, res) => {
  req.body.buktiPembayaran = req.files.buktiPembayaran[0].filename;

  transaksiController
    .uploadBuktiBayar(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Rute untuk mendapatkan semua transaksi
router.get("/getall", (req, res) => {
  transaksiController
    .getall()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Rute untuk mendapatkan transaksi berdasarkan ID pengguna
router.get("/getbyiduser/:id", (req, res) => {
  transaksiController
    .getByIdUser(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Rute untuk mendapatkan transaksi berdasarkan ID pengguna dengan batasan jumlah data
router.get("/getbyiduserlimit/:id", (req, res) => {
  transaksiController
    .getByIdUserLimit(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Rute untuk mendapatkan transaksi berdasarkan tanggal
router.get("/getbytanggal", (req, res) => {
  const { tanggal } = req.query;
  transaksiController
    .getByTanggal(tanggal)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
