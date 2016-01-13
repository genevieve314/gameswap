angular.module('userprofile', [])
  .controller('ProfileController', function(){
  	//ProfileServices, MainService
  	// will need to issue a GET request of some kind wherein we grab the user info
  //	var user = ProfileServices.getProfileData(); // assuming this will be an object 

    var user = {};  // temporary till the backend is finished
  
  /*	this.username = user.username;
  	this.email = user.email;  */
    if(user.address) {
      this.hasAddress = true;
      this.address = user.address;
    } else {
      this.hasAddress = false;
    }

    //  WILL NEED TO ADD FUNCTION(S) FOR ADDING AN ADDRESS


    //this.address = user.address || "Click the 'add address' button to add your address:";
  	this.gamesOffered = [{title: "galaga", platform: "PS4", condition: "good"}, {title: "tempest", platform: "Xbox", condition: "like new"}];  // user.gamesOffered
  	this.gamesSeeking = [{title: "dig-dug", platform: "Xbox"}, {title: "pacman", platform: "PS4"}];  // user.gamesSeeking

    this.getOffering = function(){
      this.gamesOffered = [];
  //    var tempObject = ProfileServices.getOfferingList();
      for(var game in tempObject) {                       //   Unless it's an array 
        this.gamesOffered.push({
          title: game.title,
          platform: game.platform,
          condition: game.condition || 'good'      // if game.condition is undefined, set to 'good'
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

  		console.log(this.gamesOffered);

  		// need to call function to re-render offer and seek lists???

  	};

  	this.addSeek = function(game) {
  		this.gamesSeeking.push(
  			{ title: game,
  			  platform: 'PS4' //  add DOM field for this	
  			})

  		console.log(this.gamesSeeking);

  		// need to call function to re-render offer and seek lists???

  	};



  })
