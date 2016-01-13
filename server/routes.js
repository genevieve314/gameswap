var express = require('express');
var router = express.Router();
var utilities = require('./utilities');
console.log('utilities: ',utilities)



router.post('/searchofferings',function(req, res, next){
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
  //if user doesn't exist
    //return 500
  //otherwise compare if password with user password
    //if doesn't match
      //return 500
    //otherwise authenticate user and and redirect them;
    console.log('route: ', req.url);
    res.sendStatus(200);
});

router.post('/signup',function(req, res, next){
  //if user does exist
    //return 500
  //otherwise hash user password and create new user in database
    //then authenticate user and and redirect them;
    console.log('route: ', req.url);
    res.sendStatus(200);
});

router.get('/profile',utilities.checkUser, function(req, res, next){
  //return json of user data
  var user = req.session.userId;
  /*
  {
    username: username,
    firstname: firstname || null,
    lastname: lastname || null;
    profilepic : profilepic || null;
    gamesoffered: offeredgames || [],
    gameswanted: wantedgames || []
  }
  */
  console.log('route: ', req.url);
  res.sendStatus(200);
});

router.put('/profile/update',utilities.checkUser,function(req, res, next){
  var user = req.session.userId;
  res.sendStatus(201)

});

router.use('/*',function(req, res){
  console.log('/* error, url:',req.url);
  res.sendStatus(404);
});
module.exports = router;
