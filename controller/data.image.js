const { ref, uploadBytes } = require("firebase/storage");
const storage = require("../config/fiarbase");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

exports.uploadFile = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      res.status(400).json({ message: "No file provided" });
      return;
    }

    const storageRef = ref(storage, `files/${req.file.originalname}`);

    // تأكد من أن req.file.buffer معرفة بشكل صحيح
    if (!req.file.buffer) {
      return res.status(400).json({ message: "File buffer is missing" });
    }

    uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
      console.log("file uploaded");
      res.json({ message: "File uploaded successfully" });
    });
  });
};
