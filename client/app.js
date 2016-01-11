angular
  .module('app', ['ui.router','signin', 'signup', 'main', 'results', 'services', 'userprofile'])

//for testing
  .controller('AppController', function() {
    this.games = games;
  });

/*
for use with backend:

  .controller('AppController', ['$http', function($http){
    var app = this;
    app.products = [];
    $http.get('/games.json').success(function(data){
      app.games = data;
    });
  }]);

*/
