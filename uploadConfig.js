const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "static/")); // Menyimpan file di folder 'static'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan file dengan nama unik
  },
});

// Middleware multer
const upload = multer({ storage: storage });

// Fungsi untuk mengecek null
const cekNull = (field) => {
  if (field && field.length > 0) {
    return field[0].filename;
  }
  return null;
};

module.exports = {
  upload,
  cekNull,
};
