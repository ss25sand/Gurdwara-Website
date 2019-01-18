const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// initalize connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'gurdwaradatabase'
});

// connection to database
db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('Mysql connected...');
});

// UPDATE event
router.get('/update-event', (req, res, next) => {
  let sql = '';
  let i_string = '';
  let success = false;
  for(let i = 0; i < Object.keys(req.query.array).length; i++) {
    i_string = i.toString();
    sql = `UPDATE events SET event = '${req.query.array[i_string].text}' WHERE id = ${Number(req.query.array[i_string].id)} `;
    let query = db.query(sql, (err, result) => {
      if(err) {
        throw err;
      } else {
        console.log(result);
      }
    });
  }
  res.json('Thank you for updating Program Schedule!');
});

// GET all events data for displaying purposes
router.get('/', (req, res, next) => {
  let sql = 'SELECT * FROM events';
  let query = db.query(sql, (err, result) => {
    if(err) {
      throw err;
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

// BINARY SEARCH all logins data for user authentication
router.get('/login', (req, res, next) => {
  let sql_1 = 'SELECT * FROM logins';
  let loginStatus = false;
  let query_1 = db.query(sql_1, (err, result) => {
    if(err) {
      throw err;
    } else {
      let m = 0
      // binary searching
      let lo = 0;
      let hi = Object.keys(result).length - 1;
      while (hi >= lo) {
        // prevent overflow
        let m = Math.floor(lo + (hi - lo) / 2);
        // if match found
        if(result[m.toString()].username === req.query.username && result[m.toString()].passcode === req.query.password) {
          let sql_2 = `UPDATE logins SET loginStatus = '${1}' WHERE id = ${result[m.toString()].id}`;
          let query_2 = db.query(sql_2, (err, result2) => {
            if(err) {
              throw err;
            } else {
              console.log('Login Status = 1');
              console.log(result2);
              res.json(result[m.toString()].id);
            }
          });
          loginStatus = true;
          break;
        }
        // Incorrect Password
        else if(result[m.toString()].username === req.query.username) {
          break;
        }
        // Continue to find match...
        else if(result[m.toString()].username > req.query.username) {
          lo = m + 1;
        }
        else if(result[m.toString()].username < req.query.username) {
          hi = m - 1;
        }
      }
      // if no match is found
      if(!loginStatus) {
        res.json(null);
      }
    }
  });
});

// CHECK is a user is signed in or not
router.get('/login-status', (req, res, next) => {
  let sql = `SELECT * FROM logins WHERE id=${req.query.id}`;
  let loginStatus = false;
  let query = db.query(sql, (err, result) => {
    if(err) {
      throw err;
      res.json(false);
    } else {
      if(!result['0']) {
          res.json(false);
      } else if(result['0'].loginStatus) {
          res.json(true);
      } else {
        res.json(false);
      }
    }
  });
});

// Sign User out by changing login status
router.get('/update-login-status', (req, res, next) => {
  sql = `UPDATE logins SET loginStatus = '${0}' WHERE id = ${req.query.id} `;
  let query = db.query(sql, (err, result) => {
    if(err) {
      throw err;
    } else {
      console.log("Logged out...");
      res.send("User logged out.");
    }
  });
});

module.exports = router;
