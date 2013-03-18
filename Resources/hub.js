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
hubAPI.osname = util.osname; 
/*Hub API Helper functions*/

hubAPI.indicate = function(indicatorMessage){
	var ActivityIndicator = require("ui/common/ActivityIndicator");	
	var activityIndicator = new ActivityIndicator();
		
	activityIndicator.show(indicatorMessage);
	
	var intervalLength = 1000; 
	var ttk = 10000; 
	var timeElapsed = 05; 
	
	function loadingAnimation(){
		 if (timeElapsed >= ttk){
		 	stopAnimation();
		 }
		 timeElapsed += intervalLength; 
	}
	
	function stopAnimation(){
		clearInterval(loaderAnimate);
	  	activityIndicator.hide(); 
	  	//stop appWideActivity.
	}
	var loaderAnimate = setInterval(loadingAnimation,intervalLength);
	
	hubAPI.stopIndication = function(){
		stopAnimation();
		Ti.API.info("Animation stopped");
	}
}


hubAPI.fetchResults = function(category, order, page){
	var results = [];
	hubAPI.user.getAll(results);
	addVariable(results, results.length, "auth_token", hubAPI.user.getAuthToken());
	addVariable(results, results.length, "page", page);
	addVariable(results, results.length, "order", order);
	
	SearchResults = require("services/SearchResults");
	hubAPI.searchResults = new SearchResults(category, results);
	
}

hubAPI.getRemoteURL = function(_path, site){
	//var mainURL = "http://localhost:3000/";
	var mainURL = "http://greenhub-mobile.herokuapp.com/";
	return mainURL + _path;
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