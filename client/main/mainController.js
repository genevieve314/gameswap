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
  this.searchSeeking = function(game) {
    MainService.searchSeeking({game: game})
    .then(function(data) {
      this.resultsSeeking = data.results;
      this.psGamesSeeking = [];
      this.xboxGamesSeeking = [];
      for(var i = 0; i < this.resultsSeeking.length; i++) {
        if(this.resultsSeeking[i].title.toLowerCase() === game.toLowerCase()) {
          if(this.resultsSeeking[i].platform === 'Playstation 4') {
            this.psGamesSeeking.push(this.resultsSeeking[i]);
          } else if(this.resultsSeeking[i].platform === 'Xbox One') {
            this.xboxGamesSeeking.push(this.resultsSeeking[i]);
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
  this.getUserInfo = function() {
    ProfileServices.getProfileData()
    .then(function(data) {
      this.userInfo = data;
    }.bind(this), function(error) {
      throw error;
    }.bind(this));
  };
  this.compareUserSeekingWithAllOfferings = function(userInfo) {
    this.psMatches = [];
    this.xboxMatches = [];
    for(var i = 0; i < userInfo.seeking.results.length; i++) {
      this.searchOfferings(userInfo.seeking.results[i].title);
      if(userInfo.seeking.results[i].platform === 'Playstation 4') {
        for(var j = 0; j < this.psGames.length; j++) {
          if(userInfo.seeking.results[i].city === this.psGames[j].city) {
            this.psMatches.push(this.psGames[j]);
          }
        }
      }
      if(userInfo.seeking.results[i].platform === 'Xbox One') {
        for(var k = 0; k < this.xboxGames.length; k++) {
          if(userInfo.seeking.results[i].city === this.xboxGames[k].city) {
            this.xboxMatches.push(this.xboxGames[k]);
          }
        }
      }
    }
  };
  this.compareUserOfferingWithEachMatch = function(userInfo) {
    this.swaps = [];
    for(var i = 0; i < userInfo.offering.results.length; i++) {
      this.searchSeeking(userInfo.offering.results[i].title);
      for(var j = 0; j < this.psGamesSeeking.length; j++) {
        if(userInfo.offering.results[i].title === this.psGamesSeeking[j].title && userInfo.offering.results[i].platform === 'Playstation 4') {
          for(var k = 0; k < this.psMatches.length; k++) {
            if(this.psGamesSeeking[j].username === this.psMatches[k].username) {
              this.swaps.push(userInfo.offering.results[i]);
              this.swaps.push(this.psMatches[k]);
            }
          }
        }
      }
    }
  };

  //TODO: get currentUser's seeking games from profile data and then compare against every game in the offering table
  //TODO: THEN iterate through every result and check what that result's user is seeking
    //if it matches what currentUser is offering then add to final results list to display all possible swaps
});
