var express = require('express');
var app = express();
var db = require('../database/database.js');
var PORT = 3000;

app.use(express.static(__dirname+'/../client'));


app.listen(PORT,function(){
  console.log('listening on port 3000');
});

db.addUser('test@test.com', 'somedude', 'hashed', function (data){
	console.log('add user: ', data);
	return data;
});

db.addUser('cool@cool.com', 'somechick', 'hashed', function (data){
  //console.log('add user: ', data);
  return data;
});

db.addUser('wow@wow.com', 'somepony', 'hashed', function (data){
  //console.log('add user: ', data);
  return data;
});


db.findUser('test@test.com', function (data) {
	//console.log('find user: ', data);
	return data;
})

db.addGame('game1', 'xbox', '5', 'a cool game');

db.addGame('game2', 'ps3', '2', 'a mediocre game');

db.addGame('game3', 'wii', '1', 'a super crap game');

db.addMessage(1, 2, 'first test message');

db.addMessage(1, 3, 'second test message');

db.addMessage(2, 3, 'third test message');

db.allMessagesByUserFrom(1, function(data){
  console.log('data in allMessagesByUserFrom test: ', data);
});

db.allMessagesByUserTo(3, function(data){
  console.log('data in allMessagesByUserFrom test: ', data);
});

db.addOffering(1, 'game1', 'xbox', 'great', function (data) {
	//console.log('add offering: ', data);
	return data;
});

db.searchOffering('game1', function (data) {
	//console.log('search offering: ', data);
	return data;
});

db.addSeeking(2, 'game2', 'ps3', 'fair', function (data) {
	//console.log('add seaking: ', data);
	return data;
});

db.searchSeeking('game2', function (data) {
	//console.log('search seeking: ', data);
	return data;
});







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

//example update data
  // UPDATE Customers
  // SET ContactName='Alfred Schmidt', City='Hamburg'
  // WHERE CustomerName='Alfreds Futterkiste';

