angular.module('auth.signup', [])

.controller('SignupController', function($location, $window, AuthServices){

	var user = {};
	var signup = this;

	signup.submit = function(){
		user.username = signup.username;
	 	user.password = signup.password;
	 	user.email = signup.email;
	 	user.city = signup.city;
	 	console.log(user);
	 	AuthServices.submitNewUser({user: user})
	 	/*	.then(function(token){
        		$location.path('/userprofile');
	 		})		*/
	 		.then(function(token){
	 		  if(token){
	 			console.log('the token is: ', token);

        		$location.path('/userprofile');
        	  }	else {
        	  	console.log('Error authenticating user - email already taken');
        	  	signup.email = '';
        	  	signup.password = ''; // clear the fields
        	  	signup.emailExistsInDb = true;
        	  }
	 		})
	 		.catch(function(error) {
        		console.error(error);
      		}); 	
	}
})


