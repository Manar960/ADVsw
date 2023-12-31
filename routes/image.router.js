const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controller/data.image");
const { deleteImage } = require("../controller/data.image");
const { listImages } = require("../controller/data.image");
const authMiddleware = require('../middleware/autho')

const firebase = require("firebase/app");
router.use(authMiddleware);

router.get("/", (req, res) => {
  res.json("Firebase Storage");
});


router.post("/:fileName", uploadFile);
router.delete("/:fileName/:imageName", deleteImage);
router.get("/list/:folderName", listImages);
module.exports = router;
