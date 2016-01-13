var express = require('express');
// console.log('express = ',express);
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
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Expose-Headers', 'token');

  console.log('path:',req.path)
  console.log('req.session',req.session);
  next();
});
// console.log(routes)
app.use('/',routes);

app.use(express.static(__dirname+'/../client'));



app.listen(PORT,function(){
  console.log('listening on port 3000');
});
