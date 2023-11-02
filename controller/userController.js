const db = require('../config/db'); // Import your database connection

// Create a user profile
exports.createUser = (req, res) => {
  const {UserID,Username, Email, location, interests } = req.body;
  const sql = 'INSERT INTO user (UserID, Username, Email, location, interests) VALUES (?, ?, ?, ?, ?)';

  const values = [UserID,Username, Email, location, interests];

  db.query(sql, values, (err, results) => {
    if (err) {
    
      
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'User profile created' });
    }
 
  });
};

// Get a user's profile by ID
exports.getUser = (req, res) => {
  const UserID = req.params.userId;

  const sql = 'SELECT * FROM user WHERE UserID  = ?';
  const values = [UserID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
        console.log('Received UserID:', UserID);
      }
    }
  });
};

// Update a user's profile by ID
exports.updateUser = (req, res) => {
  const UserID = req.params.userId;
  const { Username, Email, location, interests } = req.body;

  const sql = 'UPDATE user SET Username = ?, Email = ?, location = ?, interests = ? WHERE UserID  = ?';
  const values = [Username, Email, location, interests, UserID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'User profile updated' });
      console.log('Received req.body:', req.body);
    }
  });
};

// Delete a user's profile by ID
exports.deleteUser = (req, res) => {
  const UserID = req.params.userId;

  const sql = 'DELETE FROM user WHERE UserID  = ?';
  const values = [UserID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({message: 'done' });
    }
  });
};
exports.searchUsers = (req, res) => {
    const { interests, location } = req.query;
  
    const sql = 'SELECT * FROM user WHERE interests LIKE ? OR location LIKE ?';
    const values = [`%${interests}%`, `%${location}%`];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  };