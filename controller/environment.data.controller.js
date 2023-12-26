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
      // Update score and badge
      const userID = req.session.userID;
      if (!userID) {
        res.status(401).json({ error: 'User not logged in' });
        return;
      }

      const getUserQuery = 'SELECT * FROM user WHERE UserID = ?';
      db.query(getUserQuery, [userID], (err, userResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (userResult.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        const currentScore = userResult[0].score || 0;
        const newScore = currentScore + 1;

        const updateBadgeQuery = `
          UPDATE user 
          SET score = ?, 
              badge = 
                  CASE 
                      WHEN score < 50 THEN 'Bronze'
                      WHEN score >= 50 AND score <= 99 THEN 'Silver'
                      ELSE 'Gold'
                  END 
          WHERE UserID = ?;
        `;

        db.query(updateBadgeQuery, [newScore, userID], (err, updateResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
          }

          res.status(201).json({ message: 'Environment record created' });
        });
      });
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

  exports.updateScore = (req, res) => {
    const userID = req.params.userId;
  
    if (!userID) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    const getUserQuery = 'SELECT * FROM user WHERE UserID = ?';
    db.query(getUserQuery, [userID], (err, userResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (userResult.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        const currentScore = userResult[0].score || 0;
        const newScore = currentScore + 1;
  
        const updateBadgeQuery = `
            UPDATE user 
            SET score = ?, 
                badge = 
                    CASE 
                        WHEN score < 50 THEN 'Bronze'
                        WHEN score >= 50 AND score <= 99 THEN 'Silver'
                        ELSE 'Gold'
                    END 
            WHERE UserID = ?;
        `;
  
        db.query(updateBadgeQuery, [newScore, userID], (err, updateResult) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
  
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
  
            return res.status(200).json({ message: 'User score and badge updated successfully' });
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
  
        const updateBadgeQuery = `
          UPDATE user 
          SET badge = 
            CASE 
              WHEN score < 50 THEN 'Bronze'
              WHEN score >= 50 AND score <= 99 THEN 'Silver'
              ELSE 'Gold'
            END 
          WHERE UserID = ?;
        `;
        db.query(updateBadgeQuery, [userID], (err, updateBadgeResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }
  
          const decrementReportFakeQuery = 'UPDATE environment SET reportFake = reportFake - 1 WHERE DataID = ?';
          db.query(decrementReportFakeQuery, [dataID], (err, decrementReportResult) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }
  
            return res.status(200).json({ message: 'Report fake status and badge updated successfully' });
          });
        });
      });
    });
  };
  