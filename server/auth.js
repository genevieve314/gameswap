
var jwt = require('jwt-simple');
var secret = 'temp secret';
var scope = 'full access';

module.exports.checkUser = function(req, res, next){

  if(!req.headers['x-access-token']){
    console.error('no token found!!');
    res.sendStatus(500);
  }
  var decodedToken = jwt.decode(req.headers['x-access-token'],secret)//jwt.decode(req.body.token,secret)

  if(decodedToken.scope === scope){
    req.user = {};
    req.user.id = decodedToken.id;
    req.user.email = decodedToken.email;
    next();
  }else {
    console.error('Token doesn\'t match!');
    res.sendStatus(500);
  }
};

module.exports.authenticateUser = function(id, email, res, req){

  var payload = {id: id, email: email, scope: scope};

  var token = jwt.encode(payload, secret);

  console.log('successfully authenticated user');
  res.set('token', token);

  res.json({token: token});
};
