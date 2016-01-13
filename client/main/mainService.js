angular
  .module('main.service', [])
  .service('MainService', function($http) {
  this.searchOfferings = function(game){
    return $http.post('/searchofferings', game)
    .then(function(resp){
      console.log('response',resp);
      return resp.data;
    }.bind(this), function(error) {
      throw error;
    }.bind(this));
  };
});
