var express = require('express');
var app = express();
var db = require('../database/database.js');
var PORT = 3000;

app.use(express.static(__dirname+'/../client'));


app.listen(PORT,function(){
  console.log('listening on port 3000');
});

var user = db.addUser('test@test.com', 'somedude', 'hashed', function (data){
	console.log('add user: ', data);
	return data;
});

db.findUser('test@test.com', function (data) {
	console.log('find user: ', data);
	return data;
})

var game1 = db.addGame('game1', 'xbox', '5', 'a cool game', function (data) {
	console.log('add game1: ', data);
	return data;
});

var game2 = db.addGame('game2', 'ps3', '2', 'a mediocre game', function (data) {
	console.log('add game2: ', data);
	return data;
});

var game3 = db.addGame('game3', 'wii', '1', 'a super crap game', function (data) {
	console.log('add game3: ', data);
	return data;
});

setTimeout(function(){ console.log('waiting') }, 1000);

db.addOffering(1, 1, 'great', function (data) {
	console.log('add offering: ', data);
	return data;
});

db.searchOffering('game1', function (data) {
	console.log('search offering: ', data);
	return data;
});

db.addSeeking(1, 2, 'fair', function (data) {
	console.log('add seaking: ', data);
	return data;
});

db.searchSeeking('game2', function (data) {
	console.log('search seeking: ', data);
});

