const multer = require("multer");
const path = require("path");
const maxSize = 20000000;
const fs = require("fs");

// Tentukan path ke folder static berdasarkan lokasi file uploadConfig.js
const staticPath = path.join(__dirname, "..", "static");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, staticPath); // Gunakan path yang benar untuk folder static
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = new Date().toISOString().replace(/:/g, "-");
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
});

const cekNull = (fileUpload) => {
  if (!fileUpload || !Array.isArray(fileUpload) || fileUpload.length === 0) {
    return null;
  }
  return fileUpload[0].filename;
};

module.exports = { upload, cekNull };
