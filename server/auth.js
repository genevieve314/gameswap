var bcrypt = require('bcrpyt');

var users = {};

var authentication = {};

authentication.signin = function(req, res, next){
  var user = user[req.useremail];
  if(user){
    if(bcrypt.compare(user.password,req.password)){
      //success
      console.log('logged user in');
      res.redirect('/');
    }else {
      console.error('password for user:'+user, 'didnt match!');
      res.sendStatus(500);
    }
  }else {
    console.error('email: ',req.useremail,'not found!');
    res.sendStatus(500);
  }
};

authentication.signup = function(req, res, next){

  if(req.useremail){
    res.sendStatus(500)
  }else {
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(req.password, salt, function(err, hash){
        if(err){
          throw err;
        }
        users[req.useremail] = {username: req.username, password: hash};
        req.session.user = req.useremail;
      });
    });
  }
  res.sendStatus(200);
};
