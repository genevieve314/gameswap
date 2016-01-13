
var jwt = require('jwt-simple');
var secret = 'temp secret';
var scope = 'full access';

module.exports.checkUser = function(req, res, next){
  var decodedToken = jwt.decode(req.body.token,secret)
  if(decodedToken.scope === scope){
    req.user = {};
    req.user.id = decodedToken.id;
    req.user.email = decodedToken.email;
    console.log('user check successful');
    next();
  }
  console.log('Token doesn\'t match');
  res.sendStatus(500);
};

module.exports.authenticateUser = function(id, email, res, req){

  var payload = {id: id, email: email, scope: scope};

  var token = jwt.encode(payload, secret);
  console.log('successfully authenticated user');
  res.set('token', token);

  res.json({token: token});
};
