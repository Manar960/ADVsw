const db = require('../config/db');

exports.sendmessages = (req, res) => {
    const { sender_id, receiver_id, message } = req.body;

    if (!sender_id || !receiver_id || !message) {
      return res.status(400).json({ error: 'Missing sender_id, receiver_id, or message' });
    }
  
    const query = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
    db.query(query, [sender_id, receiver_id, message], (err, result) => {
      if (err) {
        console.error('Error creating message: ' + err.message);
        return res.status(500).json({ error: 'Message creation failed' });
      }
  
      res.status(201).json({ message: 'Message sent successfully' });
    });

};
exports.receivemessages = (req, res) => {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id' });
    }
  
    const query = 'SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ?';
    db.query(query, [user_id, user_id], (err, results) => {
      if (err) {
        console.error('Error fetching messages: ' + err.message);
        return res.status(500).json({ error: 'Message retrieval failed' });
      }
  
      res.json(results);
    });

};