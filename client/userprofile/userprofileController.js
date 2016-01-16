angular.module('userprofile', [])
  .controller('ProfileController', function(AuthServices, ProfileServices){

    var userInfo = this;

    this.gamesOffered = [];
    this.gamesSeeking = [];
    this.updateClicked = false;

    var loadProfile = function() {
      ProfileServices.getProfileData()
        .then(function(resp) {
          userInfo.username = resp.username;
          userInfo.email = resp.email;
          userInfo.city = resp.city || 'santa monica';

/* commenting out since we're leaving out full address for the time being
          if(resp.address) {
            userInfo.hasAddress = true;
            userInfo.address = resp.address;
          } else {
            userInfo.hasAddress = false;
          }
*/

          userInfo.gamesOffered = resp.offerings;
          userInfo.gamesSeeking = resp.seeking;

        });
    };

    this.toggleUpdate = function(){
      if(!this.updateClicked) {
        this.updateClicked = true;
      } else {
        this.updateClicked = false;
      }

    }

    this.submitUpdate = function(update) {
      console.log("update obj: ", update);
      ProfileServices.updateProfile(update)
        .then(function(resp){
          console.log("resp in submitUpdate: ", resp);

          setTimeout(loadProfile, 1000);

        });
      this.toggleUpdate();
    };

  	this.addOffer = function(game) {
      if(game.platform){
        ProfileServices.addGameOffering({
  			  title: game.title,
  			  platform: game.platform,
          condition: game.condition
  			}).then(function(resp){
          console.log('resp in this.addOffer promise: ', resp);

          setTimeout(loadProfile, 1000);
        });
      } else {
        console.log('ERROR: no platform chosen');
        this.noOffPlatform = true;         
      }
  	};

  	this.addSeek = function(game) {
      console.log('game obj in this.addSeek');
      if(game.platform){
        ProfileServices.addGameSeeking({
          title: game.title,
          platform: game.platform 
        }).then(function(resp){
          console.log('resp in this.addSeek promise: ', resp);

          setTimeout(loadProfile, 1000);
        });
      } else {
        console.log('ERROR: no platform chosen');
        this.noSeekPlatform = true;  
      }
  	};

  	this.signOut = function(){
  		AuthServices.signOut();
  	}

    loadProfile();
    console.log('LOADING PROFILE CONTROLLER');

    /* getOffering and getSeeking are handled by loadProfile for now...

    this.getOffering = function(){
      this.gamesOffered = [];
      var tempArray = ProfileServices.getProfileData().offerings; // might need to promisify
      for(var i = 0; i < tempArray.length; i++) {
        this.gamesOffered.push({
          title: game.title,
          platform: game.platform,
          condition: game.condition
        });
      };
    };

    this.getSeeking = function(){
      this.gamesSeeking = [];
      var tempArray = ProfileServices.getProfileData().seeking;   // might need to promisify
      for(var i = 0; i < tempArray.length; i++) {
        this.gamesSeeking.push({
          title: game.title,
          platform: game.platform
        });
      };
    };

    */

  })
