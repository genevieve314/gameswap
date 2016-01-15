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
	 			//$window.localStorage.setItem('com.gameswap', token); 

			// using setTimeout till we get the async hammered out

        		//setTimeout($location.path('/userprofile'), 500);

        		$location.path('/userprofile');
        	  }	
	 		})
	 		.catch(function(error) {
	 			console.log("this is the error message from the signin Controller: ");
        		console.error(error);
        									// add red error messages to DOM, clear fields
      		}); 
	}
})