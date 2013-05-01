var hubAPI = {};

var utilities = require("ui/common/utilities");
var util = new utilities();
hubAPI.util = util; 
hubAPI.hsf = util.height_scale_factor;
hubAPI.wsf = util.width_scale_factor;
hubAPI.app_width = util.app_width; 
hubAPI.app_height = util.app_height; 
hubAPI.margin_offset = (util.app_width-350*util.wsf)/2;
hubAPI.customBgColor = util.customBgColor;
hubAPI.customTextColor = util.customTextColor;
hubAPI.hubDarkBlue = "#013a5f";
hubAPI.imagePath = function(imagePath){
	return util.imagePath(imagePath);	
}
hubAPI.osname = util.osname; 

/*Adds a key value index to an array
*/
var addVariable = function (_array, _index, _key, _value){
	var additions = {}
	additions["key" + _index] = _key;
	additions["value" + _index] = _value;
	_array.push(additions);
}

//require the UI components necessary to drive the test
var NavigationController = require('NavigationController').NavigationController;
		
//create NavigationController which will drive our simple application
hubAPI.controller = new NavigationController();
		
/*Hub API Helper functions*/
hubAPI.openWindow = function(windowToOpen){
	hubAPI.controller.open(windowToOpen);
}

//Closes the current window
hubAPI.closeWindow = function(){
	hubAPI.controller.close(); 
}

//Closes the current window
hubAPI.homeWindow = function(){
	hubAPI.controller.home(); 
	Ti.API.info("Closed all Pages. "); 
	return true; 
}


hubAPI.indicate = function(indicatorMessage){
	var ActivityIndicator = require("ui/common/ActivityIndicator");	
	var activityIndicator = new ActivityIndicator();
		
	activityIndicator.show(indicatorMessage);
	
	var intervalLength = 1000; 
	var ttk = 10000; 
	var timeElapsed = 0; 
	
	function loadingAnimation(){
		 if (timeElapsed >= ttk){
		 	stopAnimation();
		 }
		 timeElapsed += intervalLength; 
		 Ti.API.info(timeElapsed/1000);
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

hubAPI.addVariable = addVariable; 

hubAPI.fetchNeon = function(neonPath, o){
	var params = [];
	addVariable(params, params.length, "auth_token", hubAPI.user.getAuthToken());
	
	Connection = require('services/Connection');

	var response = new Connection({
		start: function() {
			if (o.start) { o.start(); }
			},
			
		error: function() {
			if (o.error) { o.error(); }
			},
		
		success: function(_json){
				o.success(_json);
			}
	}, neonPath.slice(1) , [], "GET", params);
}

hubAPI.showNeon = function(neon){
	NeonView = require("ui/common/dashboardViews/exploreViews/NeonView");
	var neonView = new NeonView(neon); 
	hub.API.openWindow(neonView);
}

hubAPI.showUser = function(user){
	UserView = require("ui/common/dashboardViews/exploreViews/UserProfileView");
	var userView = new UserView(user); 
	hub.API.openWindow(userView);
}
hubAPI.fetchResults = function(category, order, page, o){
	var results = [];
	hubAPI.user.getAll(results);
	addVariable(results, results.length, "auth_token", hubAPI.user.getAuthToken());
	addVariable(results, results.length, "page", page);
	addVariable(results, results.length, "order", order);
	addVariable(results, results.length, "query", hubAPI.user.getFilterQuery());
	addVariable(results, results.length, "content", hubAPI.user.getFilterContent())
	
	SearchResults = require("services/SearchResults");
	hubAPI.searchResults = new SearchResults(category, results, o);
	
}

hubAPI.getRemoteURL = function(_path, site){
	/*var localhost = "localhost"
	if (hubAPI.osname === "android"){
		localhost = "10.0.2.2";
	}
	var mainURL = "http://" + localhost + ":3000/";*/
	var mainURL = "http://greenhub-mobile.herokuapp.com/";
	return mainURL + _path;
}

hubAPI.fetchProfileInfo = function(o){
	var  arguments = []; 
	addVariable(arguments, arguments.length, "auth_token", hubAPI.user.getAuthToken());
	Connection = require('services/Connection');
    var response = new Connection(o, "users" , [], "GET", arguments);
}

hubAPI.newMessage = function(recepient){
	NewMessageView = require("ui/common/dashboardViews/messageViews/NewMessageView");
	var newMessageView = new NewMessageView(); 
	hub.API.openWindow(newMessageView);
}

hubAPI.userTypes = ["Team?", "Fellow", "Ashoka Support Network", "Ashoka Team", "Changemaker", "Changeleader"]; 

hubAPI.fetchMessages = function(category, page, o){
	var results = [];
	addVariable(results, results.length, "auth_token", hubAPI.user.getAuthToken());
	addVariable(results, results.length, "page", page);

	Messages = require("services/Messages");
	if (category === "inbox"){
		category = "message_threads";
	}else{
		category = "message_threads/" + category; 
	}
	hubAPI.messages = new Messages(category, results, o);
	
}

exports.API = hubAPI; 