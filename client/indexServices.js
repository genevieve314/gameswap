angular.module('index.services', [])
.service('IndexServices', function($http, $location, $window){	

	this.checkState = function(){
		var hasToken = !!$window.localStorage.getItem('com.gameswap');
    	if (hasToken) {
      	    this.isAuth = true;
    	} else {
      		this.isAuth = false;
    	}  
  	}
  	
});