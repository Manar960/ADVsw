const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controller/data.image");

const firebase = require("firebase/app");

router.get("/", (req, res) => {
  res.json("Firebase Storage");
});

// استخدام عنوان متغير يسمى "fileName"
router.post("/:fileName", uploadFile);

module.exports = router;
