angular
.module('main.controller', [])
.controller('MainController', function(MainService) {
  //hardcoded version
  // var scope = this;
  this.games = games;
  this.users = users;
  this.searchOfferings = function(game) {
    MainService.searchOfferings(game)
    .then(function(data) {
      this.submitted = true;
      this.hasPlaystation = false;
      this.hasXbox = false;
      this.results = data;
      this.psGames = [];
      this.xboxGames = [];
      for(var i = 0; i < this.users.length; i++) {
        if(this.users[i].game.name.toLowerCase() === game.toLowerCase()) {
          this.results.push(this.users[i]);
          if(this.users[i].game.platform === 'Playstation 4') {
            if(this.hasPlaystation === false) {
              this.hasPlaystation = true;
            }
            this.psGames.push(this.users[i]);
          } else if(this.users[i].game.platform === 'Xbox One') {
            if(this.hasPlaystation === false) {
              this.hasXbox = true;
            }
            this.xboxGames.push(this.users[i]);
          }
        }
      }
    }.bind(this), function(error){
      console.error(error);
    }.bind(this));
  };
  this.displayPlaystation = function() {
    this.hasXbox = false;
    this.hasPlaystation = true;
  };
  this.displayXbox = function() {
    this.hasXbox = true;
    this.hasPlaystation = false;
  };

  //TODO: database version
  // this.searchGames = function(game) {
  //   MainService.searchGamesDb(game).
  //   then(function() {
  //
  //   });
  // };
});

//hardcoded for now to test
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
