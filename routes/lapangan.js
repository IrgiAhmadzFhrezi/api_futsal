const router = require("express").Router();
const lapanganController = require("../controllers/lapanganController");
const multer = require('multer')

const gambar = multer.diskStorage({
    filename: async function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext)
    },
    destination: async function (req, file, cb) {
        cb(null, './static/')
    }
})

const uploadImg = multer({ storage: gambar }).single("gambar")

router.post('/create', uploadImg, controller.create)

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
