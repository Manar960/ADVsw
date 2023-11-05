const { ref, uploadBytes } = require("firebase/storage");
const storage = require("../config/fiarbase");
const multer = require("multer");

const upload = multer({ dest: 'uploads/' });

exports.uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (!req.file) {
      res.status(400).json({ message: "No file provided" });
      return;
    }

    const storageRef = ref(storage, `files/${req.file.originalname}`);

    uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
      console.log("file uploaded");
      res.json({ message: "File uploaded successfully" });
    });
  });
};
