angular
.module('main.controller', [])
.controller('MainController', function(MainService) {
  this.searchOfferings = function(game) {
    MainService.searchOfferings({game: game})
    .then(function(data) {
      this.submitted = true;
      this.hasPlaystation = false;
      this.hasXbox = false;
      this.results = data.results;
      this.psGames = [];
      this.xboxGames = [];
      for(var i = 0; i < this.results.length; i++) {
        if(this.results[i].title.toLowerCase() === game.toLowerCase()) {
          if(this.results[i].platform === 'Playstation 4') {
            if(this.hasPlaystation === false) {
              this.hasPlaystation = true;
            }
            this.psGames.push(this.results[i]);
          } else if(this.results[i].platform === 'Xbox One') {
            if(this.hasPlaystation === false) {
              this.hasXbox = true;
            }
            this.xboxGames.push(this.results[i]);
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
  this.addRecipient = function(recipient) {
    MainService.addRecipient(recipient);
  };

  //TODO: get currentUser's seeking games from profile data and then compare against every game in the offering table
  //TODO: THEN iterate through every result and check what that result's user is seeking
    //if it matches what currentUser is offering then add to final results list to display all possible swaps
});
