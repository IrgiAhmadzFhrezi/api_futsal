const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config(); // Memuat variabel lingkungan dari file .env

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
    process.exit(1); // Keluar dari proses dengan kegagalan
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const directory = path.join(__dirname, "/static/");
app.use(express.static(directory));

// Mengimpor rute
app.use("/user", require("./routes/user"));
app.use("/lapangan", require("./routes/lapangan"));
app.use("/transaksi", require("./routes/transaksi"));

// Memulai server hanya setelah koneksi ke database terhubung
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
  });
});
