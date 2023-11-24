// openData.controller.js
const db = require('../config/db');

exports.getAllEnvironmentData = (req, res) => {
  const sql = 'SELECT * FROM environment';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
};




exports.getEnvironmentDataByNote = (req, res) => {
    const { name, note } = req.query;
    const sql = 'SELECT * FROM environment WHERE  Note = ?';
    const values = [ note];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  };


exports.analyzeEnvironmentDataAPI = (req, res) => {
    const { type, attribute } = req.query;
  
    if (!type || !attribute) {
      return res.status(400).json({ error: 'Missing required parameters (type, attribute)' });
    }
  
    const sql = 'SELECT * FROM environment';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        
        const analyzedData = analyzeDataAPI(results, type, attribute);
  
        res.status(200).json(analyzedData);
      }
    });
  };
  
  
  function analyzeDataAPI(data, type, attribute) {
    const numberOfRecords = data.length;
    let result;
  
    switch (type) {
      case 'min':
        result = findMinValue(data, attribute);
        break;
      case 'max':
        result = findMaxValue(data, attribute);
        break;
      case 'avg':
        result = calculateAverage(data, attribute);
        break;
      default:
        return { error: 'Invalid analysis type. Use min, max, or avg.' };
    }
  
    return {
      numberOfRecords,
      result,
      attribute,
    };
  }
  
  
  function calculateAverage(data, attribute) {
    const total = data.reduce((sum, record) => sum + record[attribute], 0);
    return total / data.length;
  }
  
  
  function findMinValue(data, attribute) {
    return Math.min(...data.map(record => record[attribute]));
  }
  
  
  function findMaxValue(data, attribute) {
    return Math.max(...data.map(record => record[attribute]));
  }
  

  