const multer = require("multer");
const path = require("path");
const maxSize = 20000000;
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "static");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
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
  limits: { fileSize: maxSize },
});

const cekNull = (fileUpload) => {
  if (fileUpload === undefined || fileUpload === null) {
    return null;
  }
  return fileUpload[0].filename;
};

module.exports = { upload, cekNull }; // Menambahkan tanda kutip dan titik koma di bagian akhir
