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
hubAPI.menuRowBlue = "#e5eaf0";
hubAPI.imagePath = function(imagePath, _level){
	return util.imagePath(imagePath, _level);	
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
hubAPI.getTouchEnabled = function(){
	
	if (hubAPI.osname == "iphone" || hubAPI.osname == "ipad"){
		return false;
	}
	return true; 
}


hubAPI.getSelectionStyle = function(){
	
	if (hubAPI.osname == "iphone" || hubAPI.osname == "ipad"){
		return Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
	}
	return true; 
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

//Strips Html tags
hubAPI.stripHtml = function(html){
	var regex = /(<([^>]+)>)/ig;
	return html.replace(regex, "");
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

hubAPI.showNeon = function(neon, _requestType){
	
	NeonView = require("ui/common/dashboardViews/exploreViews/NeonView");
	var neonView = new NeonView(neon, _requestType); 
	hubAPI.openWindow(neonView);
}

hubAPI.showUser = function(user, _requestType){
	UserView = require("ui/common/dashboardViews/exploreViews/UserProfileView");
	var userView = new UserView(user, _requestType); 
	hubAPI.openWindow(userView);
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

hubAPI.createFollowBtn = function(neon){
	
	var followIconPath = 'little_' + neon.followWidget.text + '_star.png';

	var followBtn = Titanium.UI.createView({
		top:5,
		width: 140*hubAPI.wsf,
		height:50*hubAPI.hsf,
		right: 5,
		borderRadius:1,
		neon: neon, 
		star: "", 
		label: "", 
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
		borderColor:'#e0e0e0',
		borderRadius:5,
		borderWidth:1,
		backgroundColor:hubAPI.hubDarkBlue, 
		layout: "horizontal", 
	});
	
	followStar = Ti.UI.createImageView({
		top: 5, 
		left: 5,
		width: 40*hubAPI.wsf, 
		touchEnabled: false,
		image: hubAPI.imagePath(followIconPath, 2),
	});
	
	followLabel = Ti.UI.createLabel({
		top:5,
		left: 5,
		font: { fontSize: 22*hubAPI.hsf },
		touchEnabled: false,
		text: neon.followWidget.text, 
		color: "#FFFFFF",
	});
	followBtn.star = followStar; 
	followBtn.label = followLabel; 
	
	followBtn.add(followStar);
	followBtn.add(followLabel);
	
	
	followBtn.addEventListener('click', function(e){
		var neon = e.source.neon;
		if (neon.activityType){
			var neonAnnouncement = neon.followWidget.text + "ing " + neon.activityType + "..."; 
		}else{
			var neonAnnouncement = neon.followWidget.text + "ing..."; 
		}
		
		var followWidget = {
			start: function(){
				win.showIndicator(neonAnnouncement);
			},
			error: function(){
				Ti.API.info("Error " + neonAnnouncement);
				win.hideIndicator(); 
			},
			success: function(neon){
				win.hideIndicator();
				neon = e.source.neon; 
				status = neon.followWidget.state;
				newStatus = status.charAt(0).toUpperCase() + status.slice(1); 
				
				text = neon.followWidget.text; 
				newText = text.charAt(0).toLowerCase() + text.slice(1);
				
				neon.followWidget.text = newStatus; 
				neon.followWidget.state = newText; 
				
				e.source.neon = neon; 
				followIconPath = 'little_' + newStatus + '_star.png';
				e.source.label.text = newStatus; 
				e.source.star.image = hubAPI.imagePath(followIconPath, 2);
			}
		}; 
		if (neon.neonUrl){
			hubAPI.followItem(neon.followWidget.text, neon.neonUrl, followWidget);
		}
		else{
			hubAPI.followItem(neon.followWidget.text, neon.userUrl, followWidget);
		}
		
	});
	return followBtn; 
}
	
hubAPI.fetchActivity = function(category, page, o){
	
	var results = [];
	hubAPI.user.getAll(results);
	addVariable(results, results.length, "auth_token", hubAPI.user.getAuthToken());
	addVariable(results, results.length, "page", page);
	addVariable(results, results.length, "content", "followed")
	
	SearchResults = require("services/SearchResults");
	Ti.API.info("In hub sending request to search results"); 
	hubAPI.searchResults = new SearchResults(category, results, o);
	Ti.API.info("Search Results returned"); 
}

hubAPI.followItem = function(action, url, o){

	method = "POST"; 
	if (action == "Unfollow"){
		method = "DELETE"; 
	}
	url += "/follow"; 
	Connection = require('services/Connection');

	Ti.API.info(method + ", " + action);
    var response = new Connection(o, url, [], method);
	/*var response = new Connection({
		start: function() {
			if (o.start) { o.start(); }
			},
			
		error: function() {
			if (o.error) { o.error(); }
			},
		success: function(_response){
			if (o.success){ o.success();}
			}
	}, url, [], method);
	*/
}

hubAPI.getRemoteURL = function(_path, site){
	var localhost = "localhost"
	if (hubAPI.osname === "android"){
		localhost = "10.0.2.2";
	}
	var mainURL = "http://" + localhost + ":3000/";
	//var mainURL = "http://greenhub-mobile.herokuapp.com/";
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
	hubAPI.openWindow(newMessageView);
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