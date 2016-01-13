angular.module('userprofile', [])
  .controller('ProfileController', function(AuthServices, ProfileServices){
  	
  	// will need to issue a GET request of some kind wherein we grab the user info
    var user;

    this.loadProfile = function() {
     // var user = {};  // temporary till the backend is finished
      user = ProfileServices.getProfileData();
    /*    .then(function(resp) {
          console.log("resp in ProfileServices.getProfileData() ", resp);
          return resp;
        }); */

      // OR try...
      /*
        ProfileServices.getProfileData()
        .then(function(resp) {
          console.log("resp in ProfileServices.getProfileData() ", resp);
          user = resp;
        });

*/      
      console.log("user in loadProfile func ", user);
     	this.username = user.username;
  	  this.email = user.email;  

      if(user.address) {
        this.hasAddress = true;
        this.address = user.address;
      } else {
        this.hasAddress = false;
      }

    //  this.getOffering();
     // this.getSeeking();
    };

    //  WILL NEED TO ADD FUNCTION(S) FOR ADDING AN ADDRESS

    this.submitAddress = function(address) {  	
      console.log("address obj: ", address);

      // NEED TO RE-RENDER WITH UPDATED ADDRESS INFO (poss done in services)
      this.loadProfile();
    };


    //this.address = user.address || "Click the 'add address' button to add your address:";
  	this.gamesOffered = [{title: "sonic", platform: "PS4", condition: "good"}, {title: "mario bros", platform: "Xbox", condition: "like new"}, {title: "donkey kong", platform: "Xbox"}];  // user.gamesOffered
  	this.gamesSeeking = [{title: "dig-dug", platform: "Xbox"}, {title: "pacman", platform: "PS4"}];  // user.gamesSeeking

    this.getOffering = function(){
      this.gamesOffered = [];
  //    var tempObject = ProfileServices.getOfferingList();
      for(var game in tempObject) {                       //   Unless it's an array 
        this.gamesOffered.push({
          title: game.title,
          platform: game.platform,
          condition: game.condition || 'terrible'      // if game.condition is undefined, set to 'good'
        });
      };
    };

    this.getSeeking = function(){
      this.gamesSeeking = [];
 //     var tempObject = ProfileServices.getSeekingList();
      for(var game in tempObject) {                       //   Unless it's an array 
        this.gamesOffered.push({
          title: game.title,
          platform: game.platform
        });
      };
    };


  	this.addOffer = function(game) {
  		this.gamesOffered.push(
  			{ title: game,
  			  platform: 'PS4' //  add DOM field for this	
  			})

  		this.getOffering(); // need to call function to re-render offer and seek lists???
  	};

  	this.addSeek = function(game) {
  		this.gamesSeeking.push(
  			{ title: game,
  			  platform: 'PS4'
  			})

      this.getSeeking();    // re-render the seeking library
  	};

  	this.signOut = function(){
  		AuthServices.signOut();
  	}

    this.loadProfile();

  })
