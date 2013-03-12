var hubAPI = {};

var utilities = require("ui/common/utilities");
var util = new utilities();
hubAPI.util = util; 
hubAPI.hsf = util.height_scale_factor;
hubAPI.wsf = util.width_scale_factor;
hubAPI.app_width = util.app_width; 
hubAPI.margin_offset = (util.app_width-350*util.wsf)/2;
hubAPI.customBgColor = util.customBgColor;
hubAPI.customTextColor = util.customTextColor;
hubAPI.imagePath = function(imagePath){
	return util.imagePath(imagePath);	
}

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

exports.API = hubAPI; 