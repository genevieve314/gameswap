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
	 			console.log('successfully submited to DB');
	 			$window.localStorage.setItem('com.gameswap', token);  // com.gameswap is placeholder
        		$location.path('/userprofile');
	 		})
	 		.catch(function(error) {
        		console.error(error);
      		}); 
	}
})