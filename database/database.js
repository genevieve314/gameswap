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
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + connection.threadId);
  });

tables.create()

module.exports = {
  findUser: function (email, callback) {
    var sql = 'SELECT * FROM Users WHERE email = ?;'
    var values = email;

    connection.query(sql, values, function (err, data) {
      if (err) console.error("error in db findUser: ", err);
      callback(data);
    });
  },

  addUser: function (email, username, password, callback) {
    var sql = 'INSERT into Users (email, username, password) values(?, ?, ?);';
    var values = [email, username, password];


    connection.query(sql, values, function(err){
      if(err){ console.error('error in db addUser: ', err)};
      // console.log("data in addUser: ", data);
    });

    connection.query('SELECT id FROM Users WHERE email = ?;', email, function(err, data){
      if(err) console.error("error in db addUser: ", err);
      callback(data);
    });
  },





  addGame: function (title, platform, rating, description) {
    var check = 'SELECT * FROM Games WHERE title = ? AND platform = ?;'
    var checkValues = [title, platform]
    var insert = 'INSERT IGNORE into Games (title, platform, rating, description) values(?, ?, ?, ?);';
    var insertValues = [title, platform, rating, description];

    connection.query(check, checkValues, function(err, data){
      if (err) console.error('error 1 in db addGame: ', err);
      if (data.length === 0) {
        connection.query(insert, insertValues, function(err){
          if (err) console.error('error 2 in db addGame: ', err);
        })
      }
    });
  },


  addOffering: function (userid, title, platform, condition){
    var check = 'SELECT id FROM Games WHERE title = ? AND platform = ?;';
    var checkValues = [title, platform];
    var insert = 'INSERT into Offering (userid, game_condition, gameid) values( ?, ?, ?);';
    var insertValues = [userid, condition];

    connection.query(check, checkValues, function (err, data) {
      if (err) console.error('error 1 in db addOffering: ', err);


      console.log('game id in addOffering: ', data[0].id);

      insertValues.push(data[0].id);
      connection.query(insert, insertValues, function(err, data){
        if (err) console.error('error 2 in db addOffering: ', err);
      })
    })
  },

  addSeeking: function (userid, title, platform){
    var check = 'SELECT id FROM Games WHERE title = ? AND platform = ?;';
    var checkValues = [title, platform];
    var insert = 'INSERT into Seeking (userid, gameid) values( ?, ?);';
    var insertValues = [userid];

    connection.query(check, checkValues, function (err, data) {
      if (err) console.error('error 1 in db addSeeking: ', err);


      console.log('game id in addSeeking: ', data[0].id);


      insertValues.push(data[0].id);
      connection.query(insert, insertValues, function(err, data){
        if (err) console.error('error 2 in db addSeeking: ', err);
      })
    })
  },

  searchOffering: function (title, callback) {

    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Offering.game_condition, Offering.createdat, Users.username, Users.id, Users.city, Users.state, Users.zip, Users.geoloc FROM Games, Offering, Users WHERE Games.title = '" + title + "' AND Games.id = Offering.gameid AND Offering.userid = Users.id;";

    var values = title;

    connection.query(sql, function (err, data) {
      if (err) console.error('error in db searchOffering: ', err);
      callback(data);
    })
  },

  searchSeeking: function (title, callback) {

    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Seeking.createdat, Users.username, Users.id, Users.city, Users.state, Users.zip, Users.geoloc FROM Games, Seeking, Users WHERE Games.title = '" + title + "' AND Games.id = Seeking.gameid AND Seeking.userid = Users.id;";


    connection.query(sql, function (err, data) {
      if (err) console.error('error in db searchSeeking: ', err);
      callback(data);
    })
  },

  allOfferingByUser: function (userid, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Offering.createdat FROM Games, Offering WHERE Games.id = Offering.gameid AND Offering.userid = '" + userid + "';";

    connection.query(sql, function (err, data) {
      if (err) console.error('error in db allSeeking: ', err);
      callback(data);
    })
  },

  allSeekingByUser: function (userid, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Seeking.createdat FROM Games, Seeking WHERE Games.id = Seeking.gameid AND Seeking.userid = '" + userid + "';";

    connection.query(sql, function (err, data) {
      if (err) console.error('error in db allSeeking: ', err);
      callback(data);
    })
  },

  addMessage: function (useridfrom, useridto, text) {
    var sql = "INSERT into Messages (userto, userfrom, message) values (?, ?, ?);";
    var values = [useridto, useridfrom, text];

    connection.query(sql, values, function (err) {
      if (err) console.error('error in db addMessage: ', err);
    })
  },

  allMessagesByUserFrom: function (userid, callback) {
    var sql = "SELECT Messages.message, Messages.createdat, Users.username, Users.id, Users.email FROM Messages, Users WHERE Messages.userfrom = ? AND Users.id = Messages.userto;";

    connection.query(sql, userid, function (err, data) {
      if (err) console.error('error in db allMessagesByUserFrom: ', err);
      console.log('data in allMessagesByUserFrom: ', data);
      callback(data);
    })
  },

  allMessagesByUserTo: function (userid, callback) {
    var sql = "SELECT Messages.message, Messages.createdat, Users.username, Users.id, Users.email FROM Messages, Users WHERE Messages.userto = ? AND Users.id = Messages.userfrom;";

    connection.query(sql, userid, function (err, data) {
      if (err) console.error('error in db allMessagesByUserFrom: ', err);
      console.log('data in allMessagesByUserTo: ', data);
      callback(data);
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
