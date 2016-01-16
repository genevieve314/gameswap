angular.module('auth.signin', [])

.controller('SigninController', function($location, $window, AuthServices){
	var user = {};
	var signin = this;

	signin.submit = function(){
		user.email = signin.email;
	 	user.password = signin.password;
	 	console.log(user);
	 	AuthServices.checkSignin(user)
	 		.then(function(token){
	 		  if(token){
	 			console.log('the token is: ', token);

        		$location.path('/userprofile');
        	  }	else {
        	  	console.log('Error authenticating user');
        	  	signin.email = '';
        	  	signin.password = ''; // clear the fields
        	  	signin.isInvalid = true;
        	  }
	 		})
	 		.catch(function(error) {
	 			console.log("this is the error message from the signin Controller: ");
        		console.error(error);								
      		}); 
	}
})