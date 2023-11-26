const db = require('../config/db');

exports.sendmessages = (req, res) => {
  const sender_userID = req.session.userID;
  const { receiver_name, message } = req.body;


  const getUserQuery = 'SELECT Username FROM user WHERE UserID = ?';
  db.query(getUserQuery, [sender_userID], (getUserError, userResults) => {
    if (getUserError) {
      console.error('Error fetching sender name: ' + getUserError.message);
      return res.status(500).json({ error: 'Error fetching sender name' });
    }

    if (userResults.length === 0) {

      return res.status(404).json({ error: 'Sender not found' });
    }

    const sender_name = userResults[0].Username;
    if (sender_name == null || receiver_name == null || message == null) {
      
      return res.status(400).json({ error: 'Missing sender_userID, receiver_name, or message' });
   
    }
  
    const insertMessageQuery = 'INSERT INTO messagess (sender_name, receiver_name, message) VALUES (?, ?, ?)';
    db.query(insertMessageQuery, [sender_name, receiver_name, message], (err, result) => {
      if (err) {
        console.error('Error creating message: ' + err.message);
        return res.status(500).json({ error: 'Message creation failed' });
      }

      res.status(201).json({ message: 'Message sent successfully' });
    });
  });
};




exports.receivemessages = (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id' });
  }

  

  const query = 'SELECT * FROM messagess WHERE sender_name = ? OR receiver_name = ?';
  db.query(query, [user_id, user_id], (err, results) => {
      if (err) {
          console.error('Error fetching messages: ' + err.message);
          return res.status(500).json({ error: 'Message retrieval failed' });
      }

      res.json(results);
  });
};



