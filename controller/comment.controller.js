const db = require('../config/db'); 

exports.createComment = (req, res) => {
  const {reportID,UserID,commentText } = req.body;
  const sql = 'INSERT INTO comments (reportID,userID,commentText) VALUES (?, ?, ?)'; 

  const values = [reportID,UserID,commentText];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: ' ready!' }); 
    }
  });
};

exports.getComment = (req, res) => {
  const commentID = req.params.commentid;

  const sql = 'SELECT * FROM comments WHERE commentID  = ?';
  const values = [commentID];

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

exports.updateComment = (req, res) => {
  const CommentID = req.params.commentid;
  const { commentText } = req.body;

  const sql = 'UPDATE comments SET commentText = ? WHERE CommentID = ?';
  const values = [commentText, CommentID]; // قم بإضافة CommentID إلى المصفوفة

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Updated' });
    }
  });
};

exports.deleteComment = (req, res) => {
  const commentID = req.params.commentid;

  const sql = 'DELETE FROM comments WHERE commentID = ?';
  const values = [commentID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Deleted' });
    }
  });
};

exports.getCommentsByUserID = (req, res) => {
    const userID = req.params.userID; 
  
    const sql = 'SELECT * FROM comments WHERE userID = ?';
    const values = [userID];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0) {
          res.status(200).json(results);        
        } else {
          res.status(404).json({ message: 'No comments found for the specified user' });
        }
      }
    });
  };

  exports.getCommentsForReport = (req, res) => {
    const reportID = req.params.reportid; 
  
    const sql = 'SELECT * FROM comments WHERE reportID = ?';
    const values = [reportID];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0) {
          res.status(200).json(results);
        } else {
          res.status(404).json({ message: 'No comments found for the specified report' });
        }
      }
    });
  };