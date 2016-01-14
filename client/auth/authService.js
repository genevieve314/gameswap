angular.module('auth.service', [])  

.factory('AuthServices', function($http, $location, $window) {

	var submitNewUser = function(userData) {
		console.log('userData ', userData);
		return $http({
			method: 'POST',
			url: '/signup',
			data: userData
		}).then(function(resp) {
			console.log('resp ', resp);
			return resp.data.token;   
		}, function(error) {
  			console.error('Sign up ERROR!!! ', error);
  
		})
	};

	var checkSignin = function(userData){
		console.log('userData ', userData);
		return $http({
			method: 'POST',
			url: '/signin',
			data: {user: userData}
		}).then(function(resp) {
			console.log('resp ', resp);
			return resp.data.token;  
		}).catch(function(error) {
  			console.error('ERROR!!! Redirecting to signin ', error);
  			$location.path('/signin');
  								
		})
	};

	var isAuth = function () {
    	return !!$window.localStorage.getItem('com.gameswap');
  	};

  	var signOut = function () {
    	$window.localStorage.removeItem('com.gameswap');
    	$location.path('/signin');
  	};

	return {
		submitNewUser: submitNewUser,
		checkSignin: checkSignin,
		isAuth: isAuth,
		signOut: signOut
	};

})