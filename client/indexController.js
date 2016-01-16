angular
.module('index.controller', [])
.controller('IndexController', function(AuthServices) {
  if (AuthServices.isAuth()) {
    this.isAuth = true;
  } else {
    this.isAuth = false;
  }
  this.signOut = function(){
    AuthServices.signOut();
  };
});
