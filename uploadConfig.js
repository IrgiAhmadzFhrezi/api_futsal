const multer = require("multer");
const path = require("path");
const maxSize = 20000000; // 20 MB
const fs = require("fs");

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static"); // Hilangkan spasi ekstra di sini
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: (req, file, cb) => {
    // Validasi jenis file, misalnya hanya menerima file gambar
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Error: File harus berupa gambar dengan format jpeg, jpg, png, atau gif"
        )
      );
    }
  },
});

// Fungsi untuk mengecek null
const cekNull = (fileUpload) => {
  if (!fileUpload || fileUpload.length === 0) {
    return null;
  }
  return fileUpload[0].filename;
};

module.exports = { upload, cekNull };
