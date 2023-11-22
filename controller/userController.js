const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.createUser = (req, res) => {
  const { Username, Email, location, interests, Password } = req.body;

  const checkUserQuery = 'SELECT * FROM user WHERE Username = ? OR Email = ?';
  const checkUserValues = [Username, Email];

  db.query(checkUserQuery, checkUserValues, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      res.status(400).json({ error: 'Username or Email already exists' });
    } else {
      bcrypt.hash(Password, 10, (err, hash) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          const insertUserQuery = 'INSERT INTO user (Username, Email, location, interests, Password) VALUES (?, ?, ?, ?, ?)';
          const insertUserValues = [Username, Email, location, interests, hash];
          db.query(insertUserQuery, insertUserValues, (err, insertResult) => {
            if (err) {
              res.status(500).json({ error: 'Internal server error' });
            } else {
              res.status(201).json({ message: 'User profile created' });
            }
          });
        }
      });
    }
  });
};

exports.getUser = (req, res) => {
  const UserID = req.params.userId;

  const sql = 'SELECT * FROM user WHERE UserID = ?';
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
      }
    }
  });
};

exports.updateUser = (req, res) => {
  const UserID = req.params.userId;
  const { Username, Email, location, interests } = req.body;

  const sql = 'UPDATE user SET Username = ?, Email = ?, location = ?, interests = ? WHERE UserID = ?';
  const values = [Username, Email, location, interests, UserID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'User profile updated' });
    }
  });
};

exports.deleteUser = (req, res) => {
  const UserID = req.params.userId;

  const sql = 'DELETE FROM user WHERE UserID = ?';
  const values = [UserID];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'User profile deleted' });
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

exports.login = (req, res) => {
  const { Username, Password } = req.body;

  const sql = 'SELECT * FROM user WHERE Username = ?';
  db.query(sql, [Username], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        bcrypt.compare(Password, user.Password, (err, result) => {
          if (result) {
            req.session.userID = user.UserID;
            res.status(200).json({ message: 'Logged in successfully' });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  });
};



