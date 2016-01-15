var express = require('express');
var router = express.Router();
var auth = require('./auth');
var db = require('../database/database');

var bcrypt = require('bcrypt');

var Promise = require('bluebird')



router.post('/signin',function(req, res, next){
  console.log('at signin');
  email = req.body.user.email;
  password = req.body.user.password;

  db.findUser(email,function(data){
    if(data.length){
      var foundUser = data[0];

      if(bcrypt.compareSync(password,foundUser.password)){
        foundUser.id;
        console.log('success logging in');
        req.session.email = email;
        auth.authenticateUser(foundUser.id, email, res, req);
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
  // console.log('BODY>> ',req.body)
  db.findUser(email, function(data){
    if(!data.length){
      var hash = bcrypt.hashSync(password,10);
      db.addUser(email, username, hash, function(user){
        // console.log('user', user.pop());
        id =  user['LAST_INSERT_ID()'];
        req.session.email = email;
        auth.authenticateUser(id, email, res);
      });

    }else {
      console.log('user found!')
      res.sendStatus(500);
    }
  });
});

router.post('/profile', auth.checkUser, function(req, res, next){
  //return json of user data
  // var user = req.session.email;
  var userInfo = {};
  var offerings, seeking;
  console.log()
  db.allOfferingByUser(req.user.id,function(data){
    offerings = data;
  });
  db.allSeekingByUser(req.user.id,function(data){
    seeking = data;
  });
  db.findUser(req.user.email,function(info){

    info = info[0];
    userInfo.firstname = info['firstname'];
    userInfo.lastname = info['lastname'];
    userInfo.username = info['username'];
    userInfo.email = info['email'];
    userInfo.phone = info['phone'];
    userInfo.street = info['street'];
    userInfo.city = info['city'];
    userInfo.state = info['state'];
    userInfo.zip = info['zip'];
    userInfo.offerings = offerings;
    userInfo.seeking = seeking;

    console.log('route: ', req.url);
    console.log('userInfo',userInfo);
    res.json(userInfo);
  });

});

router.put('/profile/update', auth.checkUser, function(req, res, next){

  var userid = req.session.userId;

  // addUserProfile(userid, phone, street, city, state, zip, geoloc, profilepic)
  // .then(function(){
  //   res.sendStatus(201)
  // });

  var user = req.session.userId;
  res.sendStatus(201)

});

router.post('/addtoofferings', auth.checkUser, function(req, res, next){
  var title = req.body.game.title
  var platform = req.body.game.platform
  var condition = 'default condition';
  var description = 'default description';
  var rating = 5;

  db.addGame(title, platform, rating, description, function(success){
    console.log('adding', title, 'on', platform, 'to offerings');
    db.addOffering(req.user.id, title, platform, condition);
    res.sendStatus(201);
  });

});

router.post('/searchofferings', function(req, res, next){
  var game = req.body.game;
  console.log('searching offering for ',req.body.game);
  if(game){
    db.searchOffering(game, function(results){
      console.log('results offerings :',results);
      res.json({results: results});
    });
  }else {
    res.sendStatus(500);
  }


});
router.post('/addtoseeking', auth.checkUser, function(req, res, next){
  var title = req.body.game.title
  var platform = req.body.game.platform;
  var description = 'default description';
  var rating = 5;

  db.addGame(title, platform, rating, description, function(success){
    console.log('adding', title, 'on', platform, 'to seeking');
    db.addSeeking(req.user.id, title, platform);
    res.sendStatus(201);
  });

});

router.post('/searchseeking', auth.checkUser, function(req, res, next){
  var game = req.body.game;
  console.log('searching seeking for ',req.body.game);
  if(game){
    db.searchSeeking(game, function(results){
      res.json({results: results});
    });
  }else {
    res.sendStatus(500);
  }
});

router.get('/getmessagesfrom', auth.checkUser, function(req, res, next){
  var userfrom = req.user.id;

  db.allMessagesByUserFrom(userfrom, function(results){
    res.json({results: results});
  })
});

router.post('/getmessages', auth.checkUser, function(req, res, next){
  var userto = req.user.id;

  db.allMessagesByUserTo(userto, function(results){
    res.json({results: results});
  })
})

router.post('/addmessage', auth.checkUser, function(req, res, next){
  console.log('req.body in server send message: ', req.body);
  var userfrom = req.user.id;
  var userto = req.body.message.to;
  var message = req.body.message.text;

  db.addMessage(userfrom, userto, message);

});


module.exports = router;
