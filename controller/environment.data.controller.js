const db = require('../config/db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + extname);
  },
});

const upload = multer({ storage });

// Create 
exports.createEnvironment = upload.single('image'), (req, res) => {
  const {
    DataID,
    UserID,
    SourceID,
    TimeStamp,
    AirQuality,
    Humidity,
    WaterQuality,
    BiodiversityMetrics,
    WindSpeed,
    RainFall,
    PollutionLevels,
    SoilQuality,
    UvIndex,
    NoiseLevels,
    Weather,
    EventDescription,
    Note,
  } = req.body;

  const image = req.file ? req.file.path : null;

  const sql = `
    INSERT INTO environment (
      UserID, SourceID, TimeStamp, AirQuality, Humidity, WaterQuality,
      BiodiversityMetrics, WindSpeed, RainFall, PollutionLevels, SoilQuality,
      UvIndex, NoiseLevels, Weather, EventDescription, Note, Image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    UserID,
    SourceID,
    TimeStamp,
    AirQuality,
    Humidity,
    WaterQuality,
    BiodiversityMetrics,
    WindSpeed,
    RainFall,
    PollutionLevels,
    SoilQuality,
    UvIndex,
    NoiseLevels,
    Weather,
    EventDescription,
    Note,
    image,
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Environment record created' });
    }
  });
  
};

// Retrieve 
exports.getEnvironment = (req, res) => {
    const dataid = req.params.dataid;
  
    const sql = 'SELECT * FROM environment WHERE DataID = ?';
    const values = [dataid];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.status(404).json({ message: 'Environment record not found' });
        }
      }
    });
  };
  
  // Update 
  exports.updateEnvironment = (req, res) => {
    const dataid = req.params.dataid;
    const {
      AirQuality,
      Humidity,
      WaterQuality,
      BiodiversityMetrics,
      WindSpeed,
      RainFall,
      PollutionLevels,
      SoilQuality,
      UvIndex,
      NoiseLevels,
      Weather,
      EventDescription,
      Note,
    } = req.body;
  
    const sql = `
      UPDATE environment
      SET AirQuality = ?, Humidity = ?, WaterQuality = ?,
      BiodiversityMetrics = ?, WindSpeed = ?, RainFall = ?,
      PollutionLevels = ?, SoilQuality = ?, UvIndex = ?,
      NoiseLevels = ?, Weather = ?, EventDescription = ?, Note = ?
      WHERE DataID = ?`;
  
    const values = [
      AirQuality,
      Humidity,
      WaterQuality,
      BiodiversityMetrics,
      WindSpeed,
      RainFall,
      PollutionLevels,
      SoilQuality,
      UvIndex,
      NoiseLevels,
      Weather,
      EventDescription,
      Note,
      dataid,
    ];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Environment record updated' });
      }
    });
  };
  
  // Delete 
  exports.deleteEnvironment = (req, res) => {
    const dataid = req.params.dataid;
  
    const sql = 'DELETE FROM environment WHERE DataID = ?';
    const values = [dataid];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Environment record deleted' });
      }
    });
  };

