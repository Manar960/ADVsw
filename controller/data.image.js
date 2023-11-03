const db = require('../config/db');


// Create 
exports.createImage = (req, res) => {
  const {
    ImageID,
    UserID,
    ImageURL
  } = req.body;



  const sql = `
    INSERT INTO images (
        ImageID,
        UserID,
        ImageURL
    ) VALUES (?, ?, ?)`;

  const values = [
    ImageID,
    UserID,
    ImageURL
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'image record created' });
    }
  });
};

// Retrieve 
exports.getImage = (req, res) => {
    const imageid = req.params.imageid;
  
    const sql = 'SELECT * FROM images WHERE ImageID = ?';
    const values = [imageid];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.status(404).json({ message: 'imageid record not found' });
        }
      }
    });
  };
  
  
  // Delete 
  exports.deleteImage = (req, res) => {
    const imageid = req.params.imageid;
  
    const sql = 'DELETE FROM images WHERE ImageID = ?';
    const values = [imageid];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'image record deleted' });
      }
    });
  };

  exports.getAllUserImages = (req, res) => {
    const userid = req.params.userid; 
  
    const sql = 'SELECT * FROM images WHERE UserID = ?';
    const values = [userid];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
