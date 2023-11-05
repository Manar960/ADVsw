const db = require('../config/db');


// Create 
exports.createEnvironment = (req, res) => {
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
    Location
  } = req.body;



  const sql = `
    INSERT INTO environment (
      DataID, UserID, SourceID, TimeStamp, AirQuality, Humidity, WaterQuality,
      BiodiversityMetrics, WindSpeed, RainFall, PollutionLevels, SoilQuality,
      UvIndex, NoiseLevels, Weather, EventDescription, Note,Location
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

  const values = [
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
    Location
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
      Location
    } = req.body;
  
    const sql = `
      UPDATE environment
      SET AirQuality = ?, Humidity = ?, WaterQuality = ?,
      BiodiversityMetrics = ?, WindSpeed = ?, RainFall = ?,
      PollutionLevels = ?, SoilQuality = ?, UvIndex = ?,
      NoiseLevels = ?, Weather = ?, EventDescription = ?, Note = ?,Location=?
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
      Location,
      dataid
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
