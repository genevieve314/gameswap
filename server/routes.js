var express = require('express');
var router = express.Router();
var utilities = require('./utilities');
console.log('utilities: ',utilities)

var db = require('../database/database');

var bcrypt = require('bcrypt');


router.post('/searchgames',function(req, res, next){
  /*
  search object:
  {
    geo: {lat, lng} || null,
    country: someCountry,
    state: state,
    game: {title, platform};
  }
  */
  var location = req.body.location;
  console.log('route: ', req.url);
  res.sendStatus(200);
});


router.post('/signin',function(req, res, next){
  console.log('at signin');
  email = req.body.user.email;
  password = req.body.user.password;

  db.findUser(email,function(data){
    if(data.length){
      var foundUser = data[0];
      if(bcrypt.compare(password,foundUser.password)){
        req.session.userId = foundUser.id;
        req.session.email = foundUser.email;
        console.log('success logging in')
        res.redirect('/');
      }else {
        console.log('failed logging in')
        res.sendStatus(500);
      }
    }else {//not found
      console.log('user',email,'not found');
      res.sendStatus(500);
    }
  });

});

router.post('/signup',function(req, res, next){
  var username = req.body.user.username;
  var email = req.body.user.email;
  var password = req.body.user.password;
  console.log('BODY>> ',req.body)
  db.findUser(email,function(data){
    if(!data.length){
      var hash = bcrypt.hashSync(password,10);
      db.addUser(email, username, hash, function(user){
        console.log(user[0])
        req.sessions.userId = user.id;
        req.session.email = email;
      });
      res.redirect('/');
    }else {
      res.sendStatus(500);
    }
  });
});

router.get('/profile',utilities.checkUser, function(req, res, next){
  //return json of user data
  var user = req.session.email;
  var userInfo = {};
  findUser(user,function(info){
    info = info[0];
    userInfo.firstname = info[firstname];
    userInfo.lastname = info[lastname];
    userInfo.username = info[username];
    userInfo.email = info[email];
    userInfo.phone = info[phone];
    userInfo.street = info[street];
    userInfo.city = info[city];
    userInfo.state = info[state];
    userInfo.zip = info[zip];
  });
  console.log('route: ', req.url);
  res.sendjson(userInfo);
});

router.put('/profile/update',utilities.checkUser,function(req, res, next){
  //TODO
  var user = req.session.userId;
  res.sendStatus(201)

});

// router.use('/*',function(req, res){
//   console.log('/* error, url:',req.url);
//   res.sendStatus(404);
// });
module.exports = router;
