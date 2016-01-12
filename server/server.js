var express = require('express');
var app = express();
var db = require('../database/database.js');
var PORT = 3000;

app.use(express.static(__dirname+'/../client'));


app.listen(PORT,function(){
  console.log('listening on port 3000');
});
