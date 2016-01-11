angular
  .module('main', [])
  .controller('MainController', function($http) {
    this.games = games;
    this.users = users;
    this.results = [];
    this.searchGames = function(game) {
      this.results = [];
      for(var i = 0; i < this.users.length; i++) {
        if(this.users[i].game.name === game) {
          this.results.push(this.users[i]);
        }
      }
    };
  });

//hardcorded for now to test
var games = [
  {
    name: 'Fallout 4',
    score: 100,
    platform: 'Playstation 4',
    image: 'http://media.moddb.com/images/games/1/42/41925/fallout4-box.jpg'
  },
  {
    name: 'Fallout 4',
    score: 90,
    platform: 'Xbox One',
    image: 'http://cdnau.ibtimes.com/sites/au.ibtimes.com/files/styles/v2_article_large/public/2015/07/03/fallout-4.jpg'
  },
  {
    name: 'Test',
    score: 90,
    platform: 'Xbox One',
    image: ''
  },
];

var users = [
  {
    name: 'Ryan',
    game: this.games[0],
    distance: 10
  },
  {
    name: 'Tom',
    game: this.games[0],
    distance: 25
  },
  {
    name: 'Erik',
    game: this.games[1],
    distance: 10
  },
  {
    name: 'Genevieve',
    game: this.games[1],
    distance: 25
  }
];
