angular
.module('main.controller', [])
.controller('MainController', function($window, MainService, ProfileServices, AuthServices) {
  if (AuthServices.isAuth()) {
    this.token = $window.localStorage.getItem('com.gameswap');
    this.isAuth = true;
  } else {
    this.isAuth = false;
  }
  this.signOut = function(){
    AuthServices.signOut();
  };
  this.searchOfferings = function(game) {
    return MainService.searchOfferings({
      game: game
    })
    .then(function(data) {
      this.submitted = true;
      this.hasPlaystation = false;
      this.hasXbox = false;
      this.results = data.results;
      this.psGames = [];
      this.xboxGames = [];
      for (var i = 0; i < this.results.length; i++) {
        if (this.results[i].title.toLowerCase() === game.toLowerCase()) {
          if (this.results[i].platform === 'Playstation 4') {
            if (this.hasPlaystation === false) {
              this.hasPlaystation = true;
            }
            this.psGames.push(this.results[i]);
          } else if (this.results[i].platform === 'Xbox One') {
            if (this.hasPlaystation === false) {
              this.hasXbox = true;
            }
            this.xboxGames.push(this.results[i]);
          }
        }
      }
      // console.log('done search offerings');
      // console.log('psGames',this.psGames);
      // console.log('xboxGames',this.xboxGames);
    }.bind(this), function(error) {
      console.error(error);
    }.bind(this));
  };

  this.searchSeeking = function(game) {
    return MainService.searchSeeking({
      game: game
    })
    .then(function(data) {
      this.resultsSeeking = data.results;
      this.psGamesSeeking = [];
      this.xboxGamesSeeking = [];
      for (var i = 0; i < this.resultsSeeking.length; i++) {
        if (this.resultsSeeking[i].title.toLowerCase() === game.toLowerCase()) {
          if (this.resultsSeeking[i].platform === 'Playstation 4') {
            this.psGamesSeeking.push(this.resultsSeeking[i]);
          } else if (this.resultsSeeking[i].platform === 'Xbox One') {
            this.xboxGamesSeeking.push(this.resultsSeeking[i]);
          }
        }
      }
    }.bind(this), function(error) {
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
  // this.getUserInfo = function() {
  //   ProfileServices.getProfileData()
  //     .then(function(data) {
  //       console.log('data',data);
  //       this.userInfo = data;
  //     }.bind(this), function(error) {
  //       throw error;
  //     }.bind(this));
  // };
  if (this.token) {
    console.log('getting user info');
    ProfileServices.getProfileData()
    .then(function(data) {
      this.compareUserSeekingWithAllOfferings(data);
      this.userInfo = data;
      return data;
    }.bind(this))
    .then(function(data){
      this.compareUserOfferingWithEachMatch(data);
    }.bind(this));
  }

  // this.doSetTimeout = function(i) {
  //   setTimeout(function() {console.log(i);}, 1000);
  // };

  this.compareUserSeekingWithAllOfferings = function(userInfo) {
    this.psMatches = [];
    this.xboxMatches = [];
    for (var i = 0; i < userInfo.seeking.length; i++) {
      this.searchOfferings(userInfo.seeking[i].title)
      .then(function() {
        // setTimeout(function() {
        // console.log('psGames',this.psGames);
        // console.log('xboxGames',this.xboxGames);
        // console.log('i',i);
        i = i - 1;
        // console.log('i',i);
        if (userInfo.seeking[i].platform === 'Playstation 4') {
          for (var j = 0; j < this.psGames.length; j++) {
            // console.log('this.psGames',this.psGames);
            if (userInfo.city === this.psGames[j].city) {
              this.psMatches.push(this.psGames[j]);
            }
          }
        }
        if (userInfo.seeking[i].platform === 'Xbox One') {
          for (var k = 0; k < this.xboxGames.length; k++) {
            if (userInfo.city === this.xboxGames[k].city) {
              this.xboxMatches.push(this.xboxGames[k]);
            }
          }
        }
        // console.log('psMatches',this.psMatches);
        // console.log('xboxMatches',this.xboxMatches);
        // }.bind(this), 500);
      }.bind(this));
    }
  };
  // if (this.userInfo) {
  //   this.compareUserSeekingWithAllOfferings(this.userInfo);
  // }
  this.compareUserOfferingWithEachMatch = function(userInfo) {
    this.swaps = [];
    for (var i = 0; i < userInfo.offerings.length; i++) {
      this.searchSeeking(userInfo.offerings[i].title)
      .then(function() {
        i = i - 1;
        for (var j = 0; j < this.psGamesSeeking.length; j++) {
          console.log('psGamesSeeking', this.psGamesSeeking);
          if (userInfo.offerings[i].title === this.psGamesSeeking[j].title && userInfo.offerings[i].platform === 'Playstation 4') {
            for (var k = 0; k < this.xboxMatches.length; k++) {
              if (this.psGamesSeeking[j].username === this.xboxMatches[k].username) {
                this.swaps.push(this.xboxMatches[k]);
                this.swaps.push(userInfo.offerings[i]);
              }
            }
          }
        }
        for (var l = 0; l < this.xboxGamesSeeking.length; l++) {
          console.log('xboxGamesSeeking', this.xboxGamesSeeking);
          // console.log('i',i);
          // console.log('i',i);
          if (userInfo.offerings[i].title === this.xboxGamesSeeking[l].title && userInfo.offerings[i].platform === 'Xbox One') {
            for (var m = 0; m < this.psMatches.length; m++) {
              if (this.xboxGamesSeeking[l].username === this.psMatches[m].username) {
                this.swaps.push(this.psMatches[m]);
                this.swaps.push(userInfo.offerings[i]);
              }
            }
          }
        }
        console.log('swaps',this.swaps);
      }.bind(this));
    }
  };
//   if (this.userInfo) {
//     this.compareUserOfferingWithEachMatch(this.userInfo);
//   }
});
