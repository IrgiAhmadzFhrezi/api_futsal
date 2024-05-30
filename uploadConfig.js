const multer = require("multer");
const path = require("path");
const maxSize = 20000000; // 20 MB
const fs = require("fs");

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static");
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
});

// Fungsi untuk mengecek null
const cekNull = (fileUpload) => {
  if (fileUpload === undefined || fileUpload === null) {
    return null;
  }
  return fileUpload[0].filename;
};

module.exports = { upload, cekNull };
