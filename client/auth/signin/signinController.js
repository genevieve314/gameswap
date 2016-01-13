angular.module('auth.signin', [])

.controller('SigninController', function($location, $window, AuthServices){
	var user = {};
	var signin = this;

	signin.submit = function(){
		user.email = signin.email;
	 	user.password = signin.password;
	 	console.log(user);
	 	AuthServices.checkSignin({user: user})
	 		.then(function(token){
	 		  if(token){
	 			console.log('successfully submited to DB');
	 			console.log('the token is: ', token);
	 			$window.localStorage.setItem('com.gameswap', token);  // com.gameswap is placeholder
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