const db = require('../config/db'); 

exports.createReports = (req, res) => {
  const {reportType,location,descreption } = req.body;
  const sql = 'INSERT INTO reports (reportType,location,descreption) VALUES (?, ?, ?)'; 

  const values = [reportType,location,descreption];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: ' ready!' }); 
    }
  });
};

exports.getReports = (req, res) => {
  const reportID = req.params.reportid;

  const sql = 'SELECT * FROM reports WHERE reportID  = ?';
  const values = [reportID];

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

exports.updateReports = (req, res) => {
  const reportID = req.params.reportid;
  const { descreption } = req.body;

  const sql = 'UPDATE reports SET descreption = ? WHERE reportID = ?';
  const values = [descreption, reportID]; 

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Updated' });
    }
  });
};

exports.deleteReports = (req, res) => {
  const reportID = req.params.reportid;

  const sql = 'DELETE FROM reports WHERE reportID = ?';
  const values = [reportID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Deleted' });
    }
  });
};

exports.getReportsByUserID = (req, res) => {
    const userID = req.params.userid; 
  
    const sql = 'SELECT * FROM reports WHERE userID = ?';
    const values = [userID];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0) {
          res.status(200).json(results);
        } else {
          res.status(404).json({ message: 'No reports found for the specified user' });
        }
      }
    });
  };


