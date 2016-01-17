angular
.module('index.controller', [])
.controller('IndexController', function(AuthServices, IndexServices) {

	console.log('this.isAuth in IndexController: ', this.isAuth);
    if (AuthServices.isAuth()) {
      this.isAuth = true;
      console.log('this.isAuth in IndexController: ', this.isAuth);
    } else {
      this.isAuth = false;
      console.log('this.isAuth in IndexController: ', this.isAuth);
    }  
 

  // var toggleState = function(){
  //   if(AuthServices.isAuth()){
  //       this.isAuth = false;
  //       AuthServices.signOut();
  //   } else {
  //       this.isAuth = true;
  // }
  //   }

  // checkState();
  IndexServices.checkState();

  
  this.signOut = function(){
    AuthServices.signOut();
  };
});
