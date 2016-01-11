var mysql = require('mysql');
var tables = require('tables');

var connection = mysql.createConnection({
  host: 'localhost',
  port: '8080',
  user: 'admin',
  password: 'password',
  database: 'gameswap'
});

connection.connect(function(err){
  if(err){
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

tables.create();







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

//how to insert multiple values into sql string while escaping
  // var sql = "SELECT * FROM ? WHERE ? = ?";
  // var inserts = ['users', 'id', userId];
  // sql = mysql.format(sql, inserts);