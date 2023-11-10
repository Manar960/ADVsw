const db = require('../config/db'); 

exports.createComment = (req, res) => {
  const { reportID, commentText } = req.body;
  const userID = req.session.userID;        

  if (!userID) {
    res.status(401).json({ error: 'User not logged in' });
    return;
  }

  const sql = 'INSERT INTO comments (reportID, userID, commentText) VALUES (?, ?, ?)';
  const values = [reportID, userID, commentText];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Comment created successfully' });
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
  const values = [commentText, CommentID];      

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

exports.getCommentsByUserName = (req, res) => {
  const username = req.params.username;

  const sql = 'SELECT comments.*, user.Username AS author FROM comments JOIN user ON comments.userID = user.UserID WHERE user.Username = ?';
  const values = [username];

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