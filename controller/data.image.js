const { ref, uploadBytes } = require("firebase/storage");
const storage = require("../config/fiarbase");
const multer = require("multer");

// تعريف أسماء الفايل المسموح بها
const allowedFileNames = ['AirQuality', 'Humidity', 'WaterQuality', 'BiodiversityMetrics', 'WindSpeed', 'RainFall', 'PollutionLevels', 'SoilQuality', 'UvIndex', 'NoiseLevels', 'Weather'];

const upload = multer({ storage: multer.memoryStorage() });

exports.uploadFile = (req, res, next) => {
  const fileName = req.params.fileName; // اسم الفايل سيأتي من الطلب

  if (!allowedFileNames.includes(fileName)) {
    return res.status(400).json({ message: "Invalid file name" });
  }

  upload.single(fileName)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      res.status(400).json({ message: "No file provided" });
      return;
    }

    const storageRef = ref(storage, `files/${fileName}/${req.file.originalname}`);

    if (!req.file.buffer) {
      return res.status(400).json({ message: "File buffer is missing" });
    }

    uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
      console.log("file uploaded");
      res.json({ message: "File uploaded successfully" });
    });
  });
};
