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

