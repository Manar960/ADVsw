const db = require('../config/db'); 

exports.createDataSource = (req, res) => {
  const { SourceID, Sourcename, Sourcetype } = req.body;
  const sql = 'INSERT INTO DataSource (SourceID, Sourcename, Sourcetype) VALUES (?, ?, ?)'; 

  const values = [SourceID, Sourcename, Sourcetype];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Data Source ready!' }); 
    }
  });
};

exports.getDataSource = (req, res) => {
  const SourceID = req.params.sourceid;

  const sql = 'SELECT * FROM DataSource WHERE SourceID  = ?';
  const values = [SourceID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: 'No data Source' }); 
      }
    }
  });
};

exports.updateDataSource = (req, res) => {
  const SourceID = req.params.sourceid;
  const { Sourcename, Sourcetype } = req.body; 

  const sql = 'UPDATE DataSource SET Sourcename = ?, Sourcetype = ? WHERE SourceID = ?';
  const values = [Sourcename, Sourcetype, SourceID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Updated' });
    }
  });
};

exports.deleteDataSource = (req, res) => {
  const SourceID = req.params.sourceid;

  const sql = 'DELETE FROM DataSource WHERE SourceID = ?';
  const values = [SourceID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Deleted' });
    }
  });
};
