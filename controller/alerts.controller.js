const db = require('../config/db');


const { initializeApp,applicationDefault } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');


process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
  credential:applicationDefault(),
  projectId: 'env-alert',
});






exports.setUserAlert = (req, res) => {
  const userId = req.params.user_id;
  const environmentId = req.query.environment_id;
  const threshold = req.query.threshold;

  if (!userId || !environmentId || !threshold) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const checkUserQuery = 'SELECT * FROM user WHERE UserID = ?';
  db.query(checkUserQuery, [userId], (err, userResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const checkExistingAlertQuery = 'SELECT * FROM user_alerts WHERE user_id = ? AND environmental_id = ?';
    db.query(checkExistingAlertQuery, [userId, environmentId], (err, alertResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (alertResults.length > 0) {
        return res.status(409).json({ message: 'Alert already exists for this user and environment' });
      }

      const checkEnvParameterQuery = 'SELECT * FROM env_parameters WHERE id = ?';
      db.query(checkEnvParameterQuery, [environmentId], (err, envResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (envResults.length === 0) {
          return res.status(404).json({ message: 'Environment parameter not found' });
        }

        const setUserAlertQuery = 'INSERT INTO user_alerts (user_id, environmental_id, threshold) VALUES (?, ?, ?)';
        db.query(setUserAlertQuery, [userId, environmentId, threshold], (err, insertResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          return res.status(201).json({ message: 'Alert set successfully' });
        });
      });
    });
  });
};




exports.updateUserAlert = (req, res) => {
  const userId = req.params.user_id;
  const environmentId = req.params.environment_id;
  const newThreshold = req.body.new_threshold;

  if (!userId || !environmentId || !newThreshold) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const checkUserAlertQuery = 'SELECT * FROM user_alerts WHERE user_id = ? AND environmental_id = ?';
  db.query(checkUserAlertQuery, [userId, environmentId], (err, alertResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (alertResults.length === 0) {
      return res.status(404).json({ message: 'User alert not found' });
    }

    const updateAlertQuery = 'UPDATE user_alerts SET threshold = ? WHERE user_id = ? AND environmental_id = ?';
    db.query(updateAlertQuery, [newThreshold, userId, environmentId], (err, updateResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      return res.status(200).json({ message: 'Threshold updated successfully' });
    });
  });
};

exports.deleteUserAlert = (req, res) => {
  const userId = req.params.user_id;
  const environmentId = req.params.environment_id;

  if (!userId || !environmentId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const deleteAlertQuery = 'DELETE FROM user_alerts WHERE user_id = ? AND environmental_id = ?';
  db.query(deleteAlertQuery, [userId, environmentId], (err, deleteResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Alert not found for this user' });
    }

    return res.status(200).json({ message: 'Alert deleted successfully' });
  });
};



const sendPushNotification = async (deviceToken) => {
  const messaging = getMessaging();

  try {
    const message = {
      notification: {
        title: "Environmental Alert:",
        body: "High wind speed",
      },
      token: deviceToken, 
    };

    const response = await messaging.send(message);
    console.log('Notification sent:', response);
    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

const compareThresholdAndCurrentValue = async () => {
  try {
    const userAlerts = await db.query('SELECT * FROM user_alerts');
    const userAlertsArray = Array.isArray(userAlerts) ? userAlerts : [userAlerts];

    for (const userAlert of userAlertsArray.flat()) {
      const { environmental_id, threshold, user_id } = userAlert;

      try {
        const envResults = await db.query('SELECT * FROM env_parameters WHERE id = ?', [environmental_id]);

        if (!envResults || envResults.length === 0 || !envResults[0].hasOwnProperty('current_value')) {
          console.error('Invalid or empty result for environmental parameter ID:', environmental_id);
          continue; // Move to the next iteration
        }

        const currentValue = envResults[0].current_value;
        if (currentValue > threshold) {
      
          try {
            const deviceToken = '$2b$10$nz0gzqm6zXQoica2bEonUOLmeEyDvFXi/MqSakb5Xj4JOeSmKpYzG';
            await sendPushNotification(deviceToken);
          } catch (error) {
            console.error('Error sending push notification:', error);
          }
        }
      } catch (err) {
        console.error('Error fetching environmental parameters:', err);
        // Handle error if necessary
      }
    }
  } catch (error) {
    console.error('Error comparing values:', error);
    throw error;
  }
};


