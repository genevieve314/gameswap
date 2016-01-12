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

connection.connect(function(err){
    if(err){
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });

tables.create()

module.exports = {
  findUser: function(email){
    connection.query('SELECT * FROM Users WHERE email = ?', email, function(err, data){
        if(err) console.error("error in findUser: ", err);
        console.log("data in findUser: ", data);
        return data;
      })
    )

    //returns username and password
  },
  addUser: function(email, username, password){
    connection.query()

    //returns success
  }
}





// module.exports.handleQueries = {
//   example: function(){
//     connection.query(//add query string and function
//       )
//   }
//   //add other query functions to the object
// }

//how to create a table
  // connection.query('CREATE TABLE TerStops (
  //               Stop_id int,
  //               Stop_name VARCHAR(100),
  //               Stop_lat VARCHAR(100),
  //               Stop_lon VARCHAR(100),
  //               PRIMARY KEY(Stop_id))', function(err, result){

  //                   // Case there is an error during the creation
  //                   if(err) {
  //                       console.log(err);
  //                   }
  //                   else{
  //                       console.log("Table Ter_Stops Created");
  //                   }
  //               });

how to insert multiple values into sql string while escaping
  var sql = "SELECT * FROM ? WHERE ? = ?";
  var inserts = ['users', 'id', userId];
  sql = mysql.format(sql, inserts);