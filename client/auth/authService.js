angular.module('auth.service', [])  

.factory('AuthServices', function($http, $location) {

	var submitNewUser = function(userData) {
		console.log('userData ', userData);
		return $http({
			method: 'POST',
			url: '/signup',
			data: userData
		}).then(function(resp) {
			console.log('resp ', resp);
			return resp.data.token;   //  VERIFY THAT TOKEN WILL BE HERE
		}, function(error) {
  			console.error('ERROR!!! ', error);
  							  //  HANDLE REDIRECT IN CONTROLLER (USING $LOCATION, PROBABLY)
		})
	};

	var checkSignin = function(userData){
		console.log('userData ', userData);
		return $http({
			method: 'POST',
			url: '/signin',
			data: userData
		}).then(function(resp) {
			console.log('resp ', resp);
			return resp.data.token;   //  VERIFY THAT TOKEN WILL BE HERE
		}, function(error) {
  			console.error('ERROR!!! Redirecting to index ', error);
  			$location.path('/');
  								//  HANDLE REDIRECT IN CONTROLLER??? (USING $LOCATION, PROBABLY)
		})
	};

	var isAuth = function () {
    	return !!$window.localStorage.getItem('com.gameswap');
  	};

	return {
		submitNewUser: submitNewUser,
		checkSignin: checkSignin,
		isAuth: isAuth
	};

})