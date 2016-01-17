angular
.module('index.controller', [])
.controller('IndexController', function(AuthServices, IndexServices) {
    if (AuthServices.isAuth()) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
      console.log('this.isAuth in IndexController: ', this.isAuth);
    }  
 
  IndexServices.checkState();

  
  this.signOut = function(){
    AuthServices.signOut();
  };
});
