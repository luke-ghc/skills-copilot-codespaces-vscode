// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create connection to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comments'
});
connection.connect();

// Create table and insert a row
connection.query('CREATE TABLE IF NOT EXISTS comments (name VARCHAR(255), comment VARCHAR(255))', function (err) {
  if (err) throw err;
  connection.query('INSERT INTO comments (name, comment) VALUES (?, ?)', ['John', 'Hello, world!']);
});

// Retrieve all rows
app.get('/comments', function (req, res) {
  connection.query('SELECT * FROM comments', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

// Insert a row
app.post('/comments', function (req, res) {
  connection.query('INSERT INTO comments (name, comment) VALUES (?, ?)', [req.body.name, req.body.comment], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// Start web server
app.listen(3000, function () {
  console.log('Server is listening on port 3000');
});