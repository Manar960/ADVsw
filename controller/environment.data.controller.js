const db = require('../config/db');


// Create 
exports.createEnvironment = (req, res) => {
  const {
    SourceID,
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

  const userID = req.session.userID;
  if (!userID) {
    res.status(401).json({ error: 'User not logged in' });
    return;
  }

  const sql = `
    INSERT INTO environment (UserID, AirQuality, Humidity, WaterQuality,
    BiodiversityMetrics, WindSpeed, RainFall, PollutionLevels, SoilQuality,
    UvIndex, NoiseLevels, Weather, EventDescription, Note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    userID,
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
    Note
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      updateScore(userID);

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
      Note
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

  exports.updateScore = (userID) => {
    if (!userID) {
      return Promise.reject({ error: 'Missing required parameters' });
    }
  
    const getUserQuery = 'SELECT * FROM user WHERE UserID = ?';
    return new Promise((resolve, reject) => {
      db.query(getUserQuery, [userID], (err, userResult) => {
        if (err) {
          console.error(err);
          reject({ error: 'Internal server error' });
        }
  
        if (userResult.length === 0) {
          reject({ message: 'User not found' });
        }

        const currentScore = userResult[0].score || 0;
        const newScore = currentScore + 1;
  
        const updateScoreQuery = 'UPDATE user SET score = ? WHERE UserID = ?';
        db.query(updateScoreQuery, [newScore, userID], (err, updateResult) => {
          if (err) {
            console.error(err);
            reject({ error: 'Internal server error' });
          }
  
          if (updateResult.affectedRows === 0) {
            reject({ message: 'User not found' });
          }
  
          resolve({ message: 'User score updated successfully' });
        });
      });
    });
  };
  
  
  exports.updateReportFake = (req, res) => {
    const dataID = req.params.dataId;
  
    if (!dataID) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    const getEnvironmentQuery = 'SELECT * FROM environment WHERE DataID = ?';
    db.query(getEnvironmentQuery, [dataID], (err, environmentResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (environmentResult.length === 0) {
        return res.status(404).json({ message: 'Environment data not found' });
      }
  
      const updateReportFakeQuery = 'UPDATE environment SET reportFake = reportFake - 1 WHERE DataID = ?';
      db.query(updateReportFakeQuery, [dataID], (err, updateResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (updateResult.affectedRows === 0) {
          return res.status(404).json({ message: 'Environment data not found' });
        }

        const userID = environmentResult[0].UserID; 
        const decrementScoreQuery = 'UPDATE `user` SET `score` = `score` - 1 WHERE `UserID` = ?';
        db.query(decrementScoreQuery, [userID], (err, decrementResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }
  
          if (decrementResult.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
          }
  
          return res.status(200).json({ message: 'Report fake status updated successfully' });
        });
      });
    });
};

