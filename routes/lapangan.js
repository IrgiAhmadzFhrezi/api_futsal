const router = require("express").Router();
const lapanganController = require("../controllers/lapanganController");
const uploadConfig = require("../uploadConfig");
const fields = uploadConfig.upload.fields([
  {
    name: "gambar",
    maxCount: 1,
  },
]);

router.post("/create", fields, (req, res) => {
  if (req.body.gambar) {
    req.body.gambar = req.files.gambar[0].filename;
    // console.log(req.body)
    lapanganController
      .create(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    // console.log(req.body)
    lapanganController
      .create(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  }

  // // console.log(req.body)
  // lapanganController
  //   .create(req.body)
  //   .then((result) => res.json(result))
  //   .catch((err) => res.json(err));
});

router.put("/edit/:id", fields, (req, res) => {
  const gambar = uploadConfig.cekNull(req.files.gambar);
  let data = req.body;
  if (gambar) {
    data.gambar = gambar;
  } else {
    delete data.gambar;
  }
  console.log(data);
  lapanganController
    .edit(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  lapanganController
    .getData()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getbyid/:id", (req, res) => {
  console.log(req.params.id);
  lapanganController
    .getById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/hapus/:id", (req, res) => {
  lapanganController
    .delete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
