const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();

const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const directory = path.join(__dirname, "/static/");
app.use(express.static(directory));

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/"); // Penyimpanan di dalam folder 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nama file akan tetap sama dengan yang diunggah
  },
});

const upload = multer({ storage: storage });

// Routes
app.use("/user", require("./routes/user"));
app.use("/lapangan", require("./routes/lapangan"));
app.use("/transaksi", require("./routes/transaksi"));

// Upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ message: "Gambar berhasil diunggah" });
});

// Start server after database connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
  });
});
