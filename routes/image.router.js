const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controller/data.image");

const firebsae = require("firebase/app");

router.get("/", (req, res) => {
  res.json("Firebase Storage");
});

router.post("/", uploadFile);

module.exports = router;
