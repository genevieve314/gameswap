module.exports.checkUser = function(req, res, next){
  if(res.userId){
    next();
  }
  res.redirect('/signin');
}
