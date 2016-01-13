var express = require('express');
console.log('express = ',express);
var bodyParser = require('body-parser');
var session = require('express-session')
var routes = require('./routes');

var app = express();
var db = require('../database/database.js');
var PORT = 3000;
var SECRET = 'Fleetwood Macintosh'; //CHANGE THIS LATER

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(function(req,res,next){
  console.log('req.session',req.session);
  next();
});

app.use(express.static(__dirname+'/../client'));

app.use('/*', routes);

app.listen(PORT,function(){
  console.log('listening on port 3000');
});
