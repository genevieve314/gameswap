angular.module('index.controller', [])
.controller('IndexController', function(AuthServices, IndexServices) {
  if (AuthServices.isAuth()) {
    this.isAuth = true;
  } else {
      this.isAuth = false;
  }  
 
  IndexServices.checkState();

  this.signOut = function(){
    AuthServices.signOut();
  };
});
