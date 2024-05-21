const userModel = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          reject({
            sukses: false,
            msg: "Username Telah Terdaftar",
          });
        } else {
          bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash;
            userModel
              .create(data)
              .then(() =>
                resolve({
                  sukses: true,
                  msg: "Berhasil Registrasi",
                })
              )
              .catch(() =>
                reject({
                  sukses: false,
                  msg: "Gagal Registrasi",
                })
              );
          });
        }
      });
  });

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            resolve({
              sukses: true,
              msg: "Berhasil Login",
              data: user,
            });
          } else {
            reject({
              sukses: false,
              msg: "Password Anda Salah",
            });
          }
        } else {
          reject({
            sukses: false,
            msg: "Username Tidak Terdaftar",
          });
        }
      });
  });

exports.editProfile = (username, newData) =>
  new Promise((resolve, reject) => {
    userModel
      .findOneAndUpdate({ username: username }, newData, { new: true })
      .then((updatedUser) => {
        if (updatedUser) {
          resolve({
            sukses: true,
            msg: "Profil berhasil diperbarui",
            data: updatedUser,
          });
        } else {
          reject({
            sukses: false,
            msg: "Gagal memperbarui profil. Pengguna tidak ditemukan",
          });
        }
      })
      .catch((err) => {
        reject({
          sukses: false,
          msg: "Terjadi kesalahan saat memperbarui profil",
          err: err,
        });
      });
  });
