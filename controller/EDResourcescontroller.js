const db = require('../config/db'); // Import your database connection
exports.getEdresources = (req, res) => {
 const sql = 'SELECT * FROM resources';

 db.query(sql, (err, results) => {
   if (err) {
     throw err;
   }
   res.json(results);
 });
};

exports.getspecificEdresources = (req, res) => {
    const { id, title, author_name, publication_date } = req.query;
  let sql = 'SELECT * FROM resources WHERE 1';

  const params = [];

  if (id) {
    sql += ' AND id = ?';
    params.push(id);
  }
  if (title) {
    sql += ' AND title LIKE ?';
    params.push(`%${title}%`);
  }
  if (author_name) {
    sql += ' AND author_name LIKE ?';
    params.push(`%${author_name}%`);
  }
  if (publication_date) {
    sql += ' AND publication_date = ?';
    params.push(publication_date);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

exports.createEdresources = (req, res) => {
        const newResource = req.body;
        const sql = 'INSERT INTO resources SET ?';
      
        db.query(sql, newResource, (err, result) => {
          if (err) {
            throw err;
          }
          res.json({ message: 'Resource created', resource_id: result.insertId });
        });
    };

exports.updateEdresources = (req, res) => {
  const resourceId = req.params.Id;
  const updatedResource = req.body;
  const sql = 'UPDATE resources SET ? WHERE id = ?';

  db.query(sql, [updatedResource, resourceId], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows > 0) {
      res.json({ message: 'Resource updated' });
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  });
};

exports.deleteEdresources = (req, res) => {
  const resourceId = req.params.Id;
  const sql = 'DELETE FROM resources WHERE id = ?';

  db.query(sql, [resourceId], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows > 0) {
      res.json({ message: 'Resource deleted' });
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  });
};