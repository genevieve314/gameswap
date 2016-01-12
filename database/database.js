var mysql = require('mysql');
var tables = require('./tables.js');


connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'gameswap',
  multipleStatements: true
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });

tables.create()

module.exports = {
  findUser: function (email, callback) {
    var sql = 'SELECT * FROM Users WHERE email = ?;'
    var values = email;

    connection.query(sql, values, function (err, data) { 
      if (err) { 
        console.error("error in db findUser: ", err)
      };
      console.log("data in findUser: ", data);
      callback(data);
    });
  },

  addUser: function (email, username, password, callback) {
    var sql = 'INSERT into Users (email, username, password) values(?, ?, ?);';
    var values = [email, username, password];

    connection.query(sql, values, function (err) {
      if (err) console.error('error in db addUser: ', err);
    });

    connection.query('SELECT LAST_INSERT_ID();', function (err, data) {
      if (err) console.error("error in db addUser: ", err);
      callback(data);
    });
  },

  addGame: function (title, platform, rating, description, callback) {
    var sql = 'INSERT into Games (title, platform, rating, description) values(?, ?, ?, ?) WHERE NOT EXISTS (SELECT * FROM Games WHERE title = ' + title + ' AND platform =' + platform + ');';
    var values = [title, platform, rating, description];

    connection.query(sql, values, function(err){
      if(err) console.error('error in db addGame: ', err);
    });

    connection.query('SELECT LAST_INSERT_ID();', function(err, data){
      if(err){ console.error("error in db addUser: ", err)};
      console.log('data in addGames: ', data);
      callback(data);
    });

  },

  addOffering: function(userid, gameid, condition, callback){
    var sql = 'INSERT into Offering (userid, gameid, condition) values( ?, ?, ?);';
    var values = [userid, gameid, condition];

    connection.query(sql, values, function (err) {
      if (err) {
        console.error('error in db addOffering: ', err)
      };
    })
  },

  addSeeking: function (userid, gameid, condition, callback) {
    var sql = 'INSERT into Seeking (userid, gameid, condition) values( ?, ?, ?);';
    var values = [userid, gameid, condition];

    connection.query(sql, values, function (err) {
      if (err) { console.error('error in db addSeeking: ', err)
      };
    })
  }
}







// how to insert multiple values into sql string while escaping
//   var sql = "SELECT * FROM ? WHERE ? = ?";
//   var inserts = ['users', 'id', userId];
//   sql = mysql.format(sql, inserts);

//example insert query string
  // insert into employee
  // (first, last, age, address, city, state)
  // values ('Luke', 'Duke', 45, '2130 Boars Nest', 
  //         'Hazard Co', 'Georgia');
  //
  // SELECT LAST_INSERT_ID()';

//example insert where not exists
  // INSERT Competitors (cName)
  // SELECT DISTINCT Name
  // FROM CompResults cr
  // WHERE
  //    NOT EXISTS (SELECT * FROM Competitors c
  //               WHERE cr.Name = c.cName)

//example insert with data from another table
  // INSERT INTO action_2_members (campaign_id, mobile, vote, vote_date)  
  // SELECT campaign_id, from_number, received_msg, date_received
  // FROM `received_txts`
  // WHERE `campaign_id` = '8'



