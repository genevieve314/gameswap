angular
  .module('main.service', [])
  .service('MainService', function($http) {
  this.searchOfferings = function(game){
    $http.post('/searchofferings', game)
    .then(function(resp){
      return resp.data;
    }.bind(this), function(error) {
      throw error;
    }.bind(this));
  };
});
