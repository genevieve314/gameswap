var mysql = require('mysql');
var tables = require('./tables.js');
var db_config = require('../server/utilities').dbConfig;

var createConnection = function createConnection() {
    connection = mysql.createConnection(db_config);

    connection.connect(function (err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
        }
    });

    connection.on('error',function(err){
        console.error(err);
        createConnection();
    });
};

createConnection();

tables.create();

module.exports = {
  //***  USER FUNCTIONS  ***//
  findUser: function (email, callback) {
    var sql = 'SELECT * FROM Users WHERE email = ?;'
    var values = email;

    connection.query(sql, values, function (err, data) {
      if (err) {
        console.error("error in db findUser: ", err);
      }
      callback(data);
    });
  },

  addUser: function (email, username, password, city, callback) {
    var sql = 'INSERT into Users (email, username, password, city) values(?, ?, ?, ?);';
    var values = [email, username, password, city];

    connection.query(sql, values, function(err){
      if(err) {
        console.error('error in db addUser: ', err);
      }
    });

    connection.query('SELECT id FROM Users WHERE email = ?;', email, function(err, data) {
      if(err) {
        console.error("error in db addUser: ", err);
      }
      callback(data);
    });
  },

  addUserProfile: function (userid, phone, street, city, state, zip, geoloc, profilepic) {
    var sql = "UPDATE Users SET phone = ?, street = ?, city = ?, state = ?, zip = ?, geoloc = ?, profilepic = ? WHERE id = '" + userid + "';"
    var values = [phone, street, city, state, zip, geoloc, profilepic];

    connection.query(sql, values, function(err){
      if (err) {
        console.error('error in db addUserProfile: ', err);
      }
    });
  },

  //*** USERS GAMES FUNCTIONS ***//
  addGame: function (title, platform, rating, description, callback) {
    var check = 'SELECT * FROM Games WHERE title = ? AND platform = ?;'
    var checkValues = [title, platform];
    var insert = 'INSERT IGNORE into Games (title, platform, rating, description) values(?, ?, ?, ?);';
    var insertValues = [title, platform, rating, description];

    connection.query(check, checkValues, function(err, data) {
      if (err) {
        console.error('error 1 in db addGame: ', err);
      }

      if (data.length === 0) {
        connection.query(insert, insertValues, function(err) {
          if (err) console.error('error 2 in db addGame: ', err);
          else callback(true);
        });
      } else {
        callback(false);
      }
    });
  },

  addOffering: function (userid, title, platform, condition) {
    var check = 'SELECT id FROM Games WHERE title = ? AND platform = ?;';
    var checkValues = [title, platform];
    var insert = 'INSERT into Offering (userid, game_condition, gameid) values( ?, ?, ?);';
    var insertValues = [userid, condition];

    connection.query(check, checkValues, function (err, data) {
      if (err) {
        console.error('error 1 in db addOffering: ', err);
      }
      insertValues.push(data[0].id);
      connection.query(insert, insertValues, function(err, data) {
        if (err) {
          console.error('error 2 in db addOffering: ', err);
        }
      });
    });
  },

  addSeeking: function (userid, title, platform) {
    var check = 'SELECT id FROM Games WHERE title = ? AND platform = ?;';
    var checkValues = [title, platform];
    var insert = 'INSERT into Seeking (userid, gameid) values( ?, ?);';
    var insertValues = [userid];

    connection.query(check, checkValues, function (err, data) {
      if (err) {
        console.error('error 1 in db addSeeking: ', err);
      }

      insertValues.push(data[0].id);
      connection.query(insert, insertValues, function(err, data) {
        if (err) {
          console.error('error 2 in db addSeeking: ', err);
        }
      });
    });
  },

  //***  SEARCH GAMES FUNCTIONS ***//
  allGameMatchesByUser: function(user, callback){
    var sql =
      "SELECT Games.title, Games.platform, Games.thumbnail, Games.id, Offering.* FROM Offering JOIN Seeking ON Seeking.gameid = Offering.gameid JOIN  Games ON Offering.gameid = Games.id WHERE ? = Seeking.userid"
    var values = [user];

  },

  searchOffering: function (title, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Offering.game_condition, Offering.createdat, Users.username, Users.id, Users.city, Users.state, Users.zip, Users.geoloc FROM Games, Offering, Users WHERE Games.title = '" + title + "' AND Games.id = Offering.gameid AND Offering.userid = Users.id;";

    connection.query(sql, function (err, data) {
      if (err) {
        console.error('error in db searchOffering: ', err);
      }
      callback(data);
    })
  },

  searchSeeking: function (title, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Seeking.createdat, Users.username, Users.id, Users.city, Users.state, Users.zip, Users.geoloc FROM Games, Seeking, Users WHERE Games.title = '" + title + "' AND Games.id = Seeking.gameid AND Seeking.userid = Users.id;";

    connection.query(sql, function (err, data) {
      if (err) {
        console.error('error in db searchSeeking: ', err);
      }
      callback(data);
    });
  },

  allOfferingByUser: function (userid, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Offering.createdat FROM Games, Offering WHERE Games.id = Offering.gameid AND Offering.userid = '" + userid + "';";

    connection.query(sql, function (err, data) {
      if (err) {
        console.error('error in db allSeeking: ', err);
      }
      callback(data);
    });
  },

  allSeekingByUser: function (userid, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Seeking.createdat FROM Games, Seeking WHERE Games.id = Seeking.gameid AND Seeking.userid = '" + userid + "';";

    connection.query(sql, function (err, data) {
      if (err) {
        console.error('error in db allSeeking: ', err);
      }
      callback(data);
    });
  },

  //*** MESSAGE FUNCTIONS ***//
  addMessage: function (useridfrom, useridto, text) {
    var sql = "INSERT into Messages (userto, userfrom, Åamessage) values (?, ?, ?);";
    var values = [useridto, useridfrom, text];

    connection.query(sql, values, function (err) {
      if (err) {
        console.error('error in db addMessage: ', err);
      }
    });
  },


  allMessagesByUserFrom: function (userid, callback) {
    var sql = "SELECT Messages.message, Messages.createdat, Users.username, Users.id, Users.email FROM Messages, Users WHERE Messages.userfrom = ? AND Users.id = Messages.userto;";

    connection.query(sql, userid, function (err, data) {
      if (err) console.error('error in db allMessagesByUserFrom: ', err);
      // console.log('data in allMessagesByUserFrom: ', data);
      callback(data);
    })
  },

  allMessages: function (userid, callback) {
    var sql = "SELECT Messages.message, Messages.createdat, Users.username, Users.id, Users.email FROM Users, Messages WHERE Messages.userto = ? AND Messages.userfrom = Users.id;";

    connection.query(sql, userid, function (err, data) {
      if (err) console.error('error in db allMessages: ', err);
      callback(data);
    });
  }
}
