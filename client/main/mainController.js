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
    this.psGames = [];
    this.xboxGames = [];
    return MainService.searchOfferings({
      game: game
    })
    .then(function(data) {
      this.submitted = true;
      this.hasPlaystation = false;
      this.hasXbox = false;
      this.results = data.results;
      console.log(this.results[0].title);
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
    console.log(this.hasPlaystation);
    console.log(this.hasXbox);
  };
  this.displayXbox = function() {
    this.hasXbox = true;
    this.hasPlaystation = false;
    console.log(this.hasPlaystation);
    console.log(this.hasXbox);
  };
  this.addRecipient = function(recipientId, recipientName) {
    MainService.addRecipient(recipientId, recipientName);
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


  // this.doSetTimeout = function(i) {
  //   setTimeout(function() {console.log(i);}, 1000);
  // };

  this.compareUserSeekingWithAllOfferings = function(userInfo) {
    this.psGames = [];
    this.xboxGames = [];
    this.psMatches = [];
    this.xboxMatches = [];
    this.ps4Unique = {};
    this.xboxUnique = {};
    for (var i = 0; i < userInfo.seeking.length; i++) {
      (function (item) {
        this.searchOfferings(item.title)
        .then(function() {
          // setTimeout(function() {
          // console.log('psGames',this.psGames);
          // console.log('xboxGames',this.xboxGames);
          // console.log('i',i);
          // console.log('item',item);
          if (item.platform === 'Playstation 4') {
            for (var j = 0; j < this.psGames.length; j++) {
              if (userInfo.city === this.psGames[j].city) {
                this.psMatches.push(this.psGames[j]);
              }
            }
          }
          if (item.platform === 'Xbox One') {
            for (var k = 0; k < this.xboxGames.length; k++) {
              if (userInfo.city === this.xboxGames[k].city) {
                this.xboxMatches.push(this.xboxGames[k]);
              }
            }
          }
          console.log('this.psGamesOffering',this.psGames);
          console.log('this.xboxGamesOffering',this.xboxGames);
          console.log('psMatches',this.psMatches);
          console.log('xboxMatches',this.xboxMatches);
          // }.bind(this), 500);
        }.bind(this));
      }.bind(this))(userInfo.seeking[i]);
    }
  };
  // if (this.userInfo) {
  //   this.compareUserSeekingWithAllOfferings(this.userInfo);
  // }
  this.compareUserOfferingWithEachMatch = function(userInfo) {
    this.psGamesSeeking = [];
    this.xboxGamesSeeking = [];
    this.swaps = [];
    for (var i = 0; i < userInfo.offerings.length; i++) {
      (function(item) {
        this.searchSeeking(userInfo.offerings[i].title)
        .then(function() {
          // i = i - 1;
          console.log('item',item);

          for (var j = 0; j < this.psGamesSeeking.length; j++) {
            console.log('psGamesSeeking', this.psGamesSeeking);
            if (item.title === this.psGamesSeeking[j].title && item.platform === 'Playstation 4') {
              for (var k = 0; k < this.psMatches.length; k++) {
                if (this.psGamesSeeking[j].username === this.psMatches[k].username) {
                  if (this.ps4Unique[this.psMatches[k].createdat] === undefined) {
                    this.ps4Unique[this.psMatches[k].createdat] = this.psMatches[k].createdat;
                    console.log('unique ps4 games',this.ps4Unique[this.psMatches[k].createdat]);
                    this.swaps.push(item);
                    this.swaps.push(this.psMatches[k]);
                  }
                }
              }
              for (var o = 0; o < this.xboxMatches.length; o++) {
                if (this.psGamesSeeking[j].username === this.xboxMatches[o].username) {
                  if (this.ps4Unique[this.xboxMatches[o].createdat] === undefined) {
                    this.ps4Unique[this.xboxMatches[o].createdat] = this.xboxMatches[o].createdat;
                    this.swaps.push(item);
                    this.swaps.push(this.xboxMatches[o]);
                  }
                }
              }
            }
          }
          for (var l = 0; l < this.xboxGamesSeeking.length; l++) {
            console.log('xboxGamesSeeking', this.xboxGamesSeeking);
            // console.log('i',i);
            // console.log('i',i);
            if (item.title === this.xboxGamesSeeking[l].title && item.platform === 'Xbox One') {
              for (var m = 0; m < this.psMatches.length; m++) {
                if (this.xboxGamesSeeking[l].username === this.psMatches[m].username) {
                  if (this.xboxUnique[this.psMatches[m].createdat] === undefined) {
                    this.xboxUnique[this.psMatches[m].createdat] = this.psMatches[m].createdat;
                    this.swaps.push(item);
                    this.swaps.push(this.psMatches[m]);
                  }
                }
              }
              for (var n = 0; n < this.xboxMatches.length; n++) {
                if (this.xboxGamesSeeking[l].username === this.xboxMatches[n].username) {
                  if (this.xboxUnique[this.xboxMatches[n].createdat] === undefined) {
                    this.xboxUnique[this.xboxMatches[n].createdat] = this.xboxMatches[n].createdat;
                    this.swaps.push(item);
                    this.swaps.push(this.xboxMatches[n]);
                  }
                }
              }
            }
          }
          console.log('swaps',this.swaps);
          this.first = 0;
          this.second = 1;
        }.bind(this));
      }.bind(this))(userInfo.offerings[i]);
    }
  };

  this.previous = function() {
    if(this.first > 0) {
      this.first -= 2;
      this.second -= 2;
    }
    console.log(this.first);
    console.log(this.second);
  };

  this.next = function() {
    if(this.second < this.swaps.length - 1) {
      this.first += 2;
      this.second += 2;
    }
    console.log(this.first);
    console.log(this.second);
  };

  if (this.isAuth) {
    // console.log('getting user info');
    ProfileServices.getProfileData()
    .then(function(data) {
      this.compareUserSeekingWithAllOfferings(data);
      this.userInfo = data;
      console.log('userinfo', data);
      return data;
    }.bind(this))
    .then(function(data){
      this.compareUserOfferingWithEachMatch(data);
    }.bind(this));
  }
  //   if (this.userInfo) {
  //     this.compareUserOfferingWithEachMatch(this.userInfo);
  //   }
});
