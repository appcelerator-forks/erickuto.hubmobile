/*
 * Contains functions and variables common in a lot of functions
 * Keeping it DRY!
 */

/*Adds a key value index to an array 
 */
function addVariable(_array, _index, _key, _value){
	var additions = {}
	additions["key" + _index] = _key; 
	additions["value" + _index] = _value; 
	_array.push(additions);
}
var osname = Ti.Platform.osname;

/*Different ways to load images depending on platform. */
var imagePath = function(_path){
	image_path = "";
	
	if (osname === 'android') {
		image_path = "../../images/" + _path;
	}
	else {
		image_path = "images/" + _path;
	}
	
	return image_path;
};

/* Time out functionality. */
hubAPI.indicate = function(appWideActivity, displayView){
	// create an imageview and set it to the width and height of your images
	indicatorHolder = Ti.UI.createView({
		layout: "vertical", 
		height: 250, 
		width: 300, 
		top: 0, 
	});
	
	iText = "Loading " + appWideActivity + "..."; 
	indicatorText = Ti.UI.createLabel({
		top: 5, 
		text: iText, 
		height: 100, 
		width: 300, 
	});
	indicatorImage=  Ti.UI.createImageView({
	  top: 5, 
	  width:54,
	  height:54
	});
	
	indicatorHolder.add(indicatorText, indicatorImage);
	
	// set the length of the images you have in your sequence
	var loaderArrayLength=7;
	// initialize the index to 0
	var loaderIndex=0;
	var timeElapsed = 0; 
	var intervalLength = 90; 
	
	/*Time To Kill*/
	var ttk = 10000; 
	
	// this function will be called by the setInterval
	function loadingAnimation(){
	  // set the image property of the imageview by constructing the path with the loaderIndex variable
	  animation_image_path = "spinner/" + loaderIndex + ".jpg"
	  indicatorImage.image = imagePath(animation_image_path);
	  //increment the index so that next time it loads the next image in the sequence
	  loaderIndex++;
	  // if you have reached the end of the sequence, reset it to 1
	  if(loaderIndex===loaderArrayLength){
	  		loaderIndex=0;
	  }
	  timeElapsed += intervalLength; 
	  if (timeElapsed >= ttk){
	  		Ti.App.fireEvent("stopIndicator");
	  		indicatorImage.image = imagePath("reload.jpeg");
	  		indicatorImage.addEventListener('click', function(){
	  			Ti.App.fireEvent(appWideActivity);
	  			//Clear displayView
	  			for (i = 0; i < displayView.children.length; i++){
	  				displayView.remove(displayView.children[i]);
	  			}
				hubAPI.indicate(appWideActivity, displayView);
	  		});
	  		indicatorText.text = "Loading " + appWideActivity + " timed out. Click here to refresh."
	  }
	}
	 
	// start the setInverval -- adjust the time to make a smooth animation
	var loaderAnimate = setInterval(loadingAnimation,intervalLength);
	Ti.App.addEventListener('stopIndicator', function(){
	  	clearInterval(loaderAnimate);
	});	
	displayView.add(indicatorHolder);
}
	
/*Hub API Helper functions*/
hubAPI.fetchResults = function(category, order, page){

 		var results = [];
 		hubAPI.user.getAll(results);
 		addVariable(results, results.length, "auth_token", hubAPI.user.getAuthToken());
 		addVariable(results, results.length, "page", page);
 		addVariable(results, results.length, "order", order);
 		
 		SearchResults = require("services/SearchResults");
 		hubAPI.searchResults = new SearchResults(category, results);
 		
 	}

hubAPI.fetchMessages = function(category, page){
 		var results = [];
 		addVariable(results, results.length, "auth_token", hubAPI.user.getAuthToken());
 		addVariable(results, results.length, "page", page);

 		Messages = require("services/Messages");
 		if (category === "inbox"){
 			category = "message_threads";
 		}else{
 			category = "message_threads/" + category; 
 		}
 		hubAPI.messages = new Messages(category, results);
 		
 	}
 	
function Utilities(){
	this.customFont = 'SpicyRice-Regular';
	this.customBgColor = '#f9f9f9';
	this.customTextColor = '#5e656a';
	this.customTitleColor = '#0b395c';
	
	aw = Ti.Platform.displayCaps.platformWidth;
	ah = Ti.Platform.displayCaps.platformHeight;
	
	this.app_width = aw;
	this.app_height = ah;
	
	this.height_scale_factor = this.app_height/800.0;
	this.width_scale_factor = this.app_width/500
	this.magnified_height_scale_factor = this.app_height/800.0;
	this.magnified_width_scale_factor = this.app_width/500
	if (this.app_width > 500){
		this.width_scale_factor = 1; 
	}
	if (this.app_height > 800){
		this.height_scale_factor = 1; 
	}
	
	this.imagePath = imagePath; 
}

module.exports = Utilities;