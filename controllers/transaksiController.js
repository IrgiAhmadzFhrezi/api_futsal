const transaksiModel = require("../models/transaksi");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

exports.create = async (data) => {
  try {
    // Menambahkan waktu transaksi saat transaksi dibuat
    data.waktuTransaksi = new Date();

    // Debugging log: print data yang masuk
    console.log("Incoming data:", data);

    // Lakukan pengecekan apakah ada transaksi yang bersinggungan dengan transaksi baru
    const existingTransactions = await transaksiModel.find({
      tanggal: data.tanggal,
      idBarang: data.idBarang, // Menambahkan kondisi untuk memeriksa idBarang yang sama
      $or: [
        // Transaksi yang memiliki jamMulai atau jamAkhir yang sama
        {
          $or: [{ jamMulai: data.jamMulai }, { jamAkhir: data.jamAkhir }],
        },
        // Transaksi yang berada di antara jamMulai dan jamAkhir
        {
          $and: [
            { jamMulai: { $lt: data.jamAkhir } },
            { jamAkhir: { $gt: data.jamMulai } },
          ],
        },
      ],
    });

    // Debugging log: print transaksi yang ada
    console.log("Existing Transactions:", existingTransactions);

    // Memeriksa apakah ada transaksi yang bersinggungan
    if (existingTransactions.length > 0) {
      throw new Error(
        "Transaksi sudah terjadi pada jam yang sama di lapangan yang sama."
      );
    }

    // Buat transaksi baru
    await transaksiModel.create(data);

    return {
      sukses: true,
      msg: "Berhasil Transaksi",
    };
  } catch (error) {
    // Tangani kesalahan
    console.error("Error:", error);
    return {
      sukses: false,
      msg: error.message || "Gagal melakukan transaksi.",
    };
  }
};

exports.uploadBuktiBayar = (id, data) =>
  new Promise((resolve, reject) => {
    transaksiModel
      .updateOne({ _id: id }, { $set: data })
      .then(() => {
        resolve({
          sukses: true,
          msg: "Berhasil Transaksi",
        });
      })
      .catch(() => {
        reject({
          sukses: false,
          msg: "Gagal Transaksi",
        });
      });
  });

exports.getall = () =>
  new Promise((resolve, reject) => {
    try {
      transaksiModel
        .aggregate([
          {
            $lookup: {
              from: "lapangans",
              localField: "idBarang",
              foreignField: "_id",
              as: "dataBarang",
            },
          },
          {
            $unwind: "$dataBarang",
          },
        ])
        .then((data) => {
          resolve({
            sukses: true,
            msg: "Berhasil",
            data: data,
          });
        })
        .catch((e) => {
          reject({
            sukses: false,
            msg: "Gagal",
            data: [],
          });
        });
    } catch (error) {
      console.log(error);
    }
  });

exports.getByIdUser = (id) =>
  new Promise((resolve, reject) => {
    try {
      transaksiModel
        .aggregate([
          {
            $lookup: {
              from: "lapangans",
              localField: "idBarang",
              foreignField: "_id",
              as: "dataBarang",
            },
          },
          {
            $unwind: "$dataBarang",
          },
          {
            $match: {
              idUser: objectId(id),
            },
          },
          { $sort: { _id: -1 } },
        ])
        .then((data) => {
          resolve({
            sukses: true,
            msg: "Berhasil",
            data: data,
          });
        })
        .catch((e) => {
          reject({
            sukses: false,
            msg: "Gagal",
            data: [],
          });
        });
    } catch (error) {
      console.log(error);
    }
  });

exports.getByIdUserLimit = (id, limit) =>
  new Promise((resolve, reject) => {
    try {
      transaksiModel
        .aggregate([
          {
            $lookup: {
              from: "lapangans",
              localField: "idBarang",
              foreignField: "_id",
              as: "dataBarang",
            },
          },
          {
            $unwind: "$dataBarang",
          },
          {
            $match: {
              idUser: objectId(id),
            },
          },
          { $sort: { _id: -1 } },
          {
            $limit: 100,
          },
        ])
        .then((data) => {
          resolve({
            sukses: true,
            msg: "Berhasil",
            data: data,
          });
        })
        .catch((e) => {
          reject({
            sukses: false,
            msg: "Gagal",
            data: [],
          });
        });
    } catch (error) {
      console.log(error);
    }
  });

exports.getByTanggal = (tanggal) =>
  new Promise((resolve, reject) => {
    try {
      transaksiModel
        .aggregate([
          {
            $lookup: {
              from: "lapangans",
              localField: "idBarang",
              foreignField: "_id",
              as: "dataBarang",
            },
          },
          {
            $unwind: "$dataBarang",
          },
          {
            $match: {
              tanggal: tanggal,
            },
          },
          { $sort: { _id: -1 } },
        ])
        .then((data) => {
          resolve({
            sukses: true,
            msg: "Berhasil",
            data: data,
          });
        })
        .catch((e) => {
          reject({
            sukses: false,
            msg: "Gagal",
            data: [],
          });
        });
    } catch (error) {
      console.log(error);
    }
  });
