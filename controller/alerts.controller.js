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
        db.query(setUserAlertQuery, [userId, environmentId, threshold], async (err, insertResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          const fetchCurrentValueQuery = 'SELECT current_value, environment_parameter FROM env_parameters WHERE id = ?';
          db.query(fetchCurrentValueQuery, [environmentId], async (err, currentValueResult) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }

            const current_value = currentValueResult[0].current_value;
            const environment_parameter=currentValueResult[0].environment_parameter;
            if (current_value > threshold) {
           
              try {
                
                console.log(`Push notification sent for user ${userId} `);
                console.log(`Environment Alert: High ${environment_parameter}`);
              } catch (error) {
                console.error('Error sending push notification:', error);
                return res.status(500).json({ error: 'Error sending push notification' });
              }
            }

            return res.status(201).json({ message: 'Alert set successfully' });
          });
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
      const fetchCurrentValueQuery = 'SELECT current_value, environment_parameter FROM env_parameters WHERE id = ?';
          db.query(fetchCurrentValueQuery, [environmentId], async (err, currentValueResult) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }

            const current_value = currentValueResult[0].current_value;
            const environment_parameter=currentValueResult[0].environment_parameter;
            if (current_value > newThreshold) {
           
              try {
                console.log(`Push notification sent for user ${userId} `);
                console.log(`Environment Alert: High ${environment_parameter}`);
              } catch (error) {
                console.error('Error sending push notification:', error);
                return res.status(500).json({ error: 'Error sending push notification' });
              }
            }
      
            return res.status(200).json({ message: 'Threshold updated successfully' });
          })
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


exports.updateEnvironmentValue = (req, res) => {
  const { id } = req.params;
  const newCurrentValue = req.body.new_current_value;
  if (!id || !newCurrentValue) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const updateQuery = 'UPDATE env_parameters SET current_value = ? WHERE id = ?';
  db.query(updateQuery, [newCurrentValue, id], (err, updateResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Environment parameter not found' });
    }
    const fetchUserAlertsQuery = `
    SELECT ua.user_id, ua.threshold, ep.environment_parameter
    FROM user_alerts ua
    JOIN env_parameters ep ON ua.environmental_id = ep.id
    WHERE ua.environmental_id = ? AND ua.threshold < ?
   `;

  db.query(fetchUserAlertsQuery, [id, newCurrentValue], (err, userAlerts) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

   
    userAlerts.forEach((userAlert) => {

     
      console.log(`Push notification sent for user ${userAlert.user_id} `);
      console.log(`Environment Alert: High ${userAlert.environment_parameter}`);
    });


    return res.status(200).json({ message: 'Current value updated successfully' });
  })
  });
};






