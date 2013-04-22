function DashboardView(_authToken){
	hub = require("hub");
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	var margin_offset = (hub.API.app_width-350*wsf)/2;

	var appWindow = require("ui/common/UserView");
    win = new appWindow();

	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
	});
	
	
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
	}	
module.exports = DashboardView;



/*function DashboardView(){
	hub = require("hub");
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	
	var win = Ti.UI.createWindow({
		backgroundColor: hub.API.customBgColor,
		layout:'vertical',
		modal: true,
		navBarHidden: true,
        tabBarHidden: true,
	}); 

	
	var canvas = Ti.UI.createView({
		top: 0, 
		width: hub.API.app_width, 
		layout: "vertical"
	});
	var topLeftButton; 
	var topRightButton; 

	showNavBar = function(){
		if (hub.API.osname === 'android'){
			return
		}
		win.navBarHidden = false;
		win.tabBarHidden = false;
	};
	hideNavBar = function(){
		if (hub.API.osname === 'android'){
			return
		}
		win.navBarHidden = true;
		win.tabBarHidden = true;
	}

	if (hub.API.osname === "mobileweb"){
		var topNavigationBarHolder = Ti.UI.createView({
			top:0, 
			width: hub.API.app_width, 
			height: 85*hsf, 
			backgroundImage: hub.API.imagePath("navbar_background.png"),
		});
		
		topLeftButton = Ti.UI.createImageView({
			left: 5, 
			top: 6,
			width: 100*wsf,
			image: hub.API.imagePath("sign_out.png"),
			backgroundColor: '#d0ddef',
			});
				
		topRightButton = Ti.UI.createImageView({
			right: 5, 
			top: 6,
			width: 100*wsf,
			image: hub.API.imagePath("help.png"),
			backgroundColor: '#d0ddef',
			});
		
		ashoka_logo = Ti.UI.createImageView({
			top:6, 
			width: 250*wsf,
			image: hub.API.imagePath("ashoka_logo_navbar.png"),
		});
		topRightButton.addEventListener('click', function()
		{	
			Ti.App.globalWindow = win;
			Ti.App.fireEvent('closeWindow',{});
		});
		
		topNavigationBarHolder.add(topLeftButton);
		topNavigationBarHolder.add(topRightButton);
		topNavigationBarHolder.add(ashoka_logo);
		topLeftButton.addEventListener('click', function()
		{	
			hub.API.closeWindow()
		});
		
				
		topRightButton.addEventListener('click', function()
		{	
			hub.API.closeWindow()
		});
		canvas.add(topNavigationBarHolder);
	}
	
	else if (hub.API.osname === "iphone" || hub.API.osname === "ipad"){
		
		showNavBar(); 
		win.titleImage = hub.API.imagePath("ashoka_iphone_logo_navbar.png");
		win.barColor = '#d0ddef';

		var topLeftButton = Ti.UI.createButtonBar({
			labels: [{title:'Sign Out', image:hub.API.imagePath("back_nav_btn.png")}],
			backgroundColor: '#d0ddef',
			width:60,
		});

		topLeftButton.addEventListener('click', function()
		{	
			hub.API.closeWindow()
		});

		var helpButton = Ti.UI.createButtonBar({
		//backgroundImage: hub.API.imagePath("home_nav_btn.png"),
			labels: [{title:' Help', image:hub.API.imagePath("help_nav_btn.png")}],
			backgroundColor: '#d0ddef',
			width:60,
		});

		helpButton.addEventListener('click', function()
		{	
			hub.API.homeWindow();
		});
		
		win.leftNavButton = topLeftButton;
		win.rightNavButton = helpButton;
	}
	else {
		var topNavigationBarHolder = Ti.UI.createView({
			top:0, 
			width: hub.API.app_width, 
			height: 85*hsf, 
			backgroundImage: hub.API.imagePath("navbar_background.png"),
		});
		ashoka_logo = Ti.UI.createImageView({
			top:6, 
			width: 250*wsf,
			image: hub.API.imagePath("ashoka_logo_navbar.png"),
		});
		
		topNavigationBarHolder.add(ashoka_logo);
		canvas.add(topNavigationBarHolder);
	}

	var contentWrapper = Ti.UI.createView({
	    width: hub.API.app_width,
	    height: hub.API.app_height - 220*hsf, 
	});	
	canvas.add(contentWrapper);
	
	var bottomNavigationBarHolder = Ti.UI.createView({
		bottom:0, 
		width: hub.API.app_width, 
		height: 130*hsf, 
		backgroundColor: '#BDBDBD',
		layout:'horizontal', 
	});
	canvas.add(bottomNavigationBarHolder); 

	var openPage = function(_page){
		//closed_pages = hub.API.homeWindow();
		var pageURL = 'ui/common/dashboardViews/' + _page;
		PageView = require(pageURL);
	    pageView = new PageView();
		hub.API.openWindow(pageView);
	}
	
	var launch_event = function(icon_name){
		
		var icon_event = function(){}; 
		
		if (icon_name === "Profile"){
			icon_event = function(){
				hub.API.fetchProfileInfo({
					start: function(){
						showIndicator("Fetching profile information ...");
					},
					error: function(){
						Ti.API.info("Error Fetching information");
						hideIndicator(); 
					},
					success: function(response){
						hub.API.user.profile = response
						hideIndicator();
						openPage("ProfileView");
					}
				});
			}	
		}else if(icon_name === "Inbox"){
			icon_event = function(){
				hub.API.fetchMessages({
					start: function(){
						showIndicator("Fetching Messages ...");
					},
					error: function(){
						Ti.API.info("Error Fetching information");
						hideIndicator(); 
					},
					success: function(response){
						hub.API.user.profile = response
						hideIndicator();
						openPage("ExploreView");
					}
				});
			}	
		}
		
		return icon_event; 
	}

	var nav_icons = ["Activity", "Explore", "Create", "Profile", "Inbox"];
	var icon_width = ((hub.API.app_width/(nav_icons.length)) - 1); 
	
	
	for (var i = 0; i < nav_icons.length; i++){
		iconImageHeight = 70*hsf; 
		image_path = "navigation_icons/" + nav_icons[i] + ".png";
		if (iconImageHeight > 70) {
			iconImageHeight = 70; 
		} 
		left_margin = 1; 
		if (i == 0){ left_margin = 0;}
		var iconHolder = Ti.UI.createView({
			backgroundColor: hub.API.customBgColor, 
			width: icon_width, 
			left: left_margin, 
			top: 1, 
			layout: 'vertical', 
		});
		var iconImage = Ti.UI.createImageView({
			top:0, 
			height: iconImageHeight, 
			image: hub.API.imagePath(image_path),
		});
		
		var icon_event = launch_event(nav_icons[i]); 
		iconImage.addEventListener('click', icon_event); 
		
		var iconLabel = Ti.UI.createLabel({
			top: 5, 
			font:{
				fontSize:15*hsf,
		      	fontFamily: hub.API.customFont
		  	},
		  	color: 'black',
	   		text: nav_icons[i],
		}); 
		iconHolder.add(iconImage); 
		iconHolder.add(iconLabel); 
		bottomNavigationBarHolder.add(iconHolder); 
	}
	win.add(canvas);

	//Style for the indicator. 
	var style;
	if (Ti.Platform.name === 'iPhone OS'){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
	}
	else {
	  style = Ti.UI.ActivityIndicatorStyle.BIG;
	}
	
	indicatorHolder = Ti.UI.createView({
		height: "100",
		backgroundColor: "#000", 
		layout: "horizontal", 
		width: "90%", 
		opacity: 0.8,
	});
	indicator = Titanium.UI.createActivityIndicator({
		style:style,
		font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
		color:'#FFF',
		height:70,
		width:70,
		left: "5", 
	});

	indicatorLabel = Ti.UI.createLabel({
		font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
		color: "#FFF", 
		text: "Loading...", 
		width: "auto", 
		height: "auto", 
		left: "10", 
	}); 
	
	indicatorHolder.add(indicator); 
	indicatorHolder.add(indicatorLabel);
	
	var win2 = Ti.UI.createWindow({
	  backgroundColor: '#000',
	  opacity: 0.5,
	  navBarHidden: true,
	});
	win2.add(indicatorHolder);
	
	
	showIndicator = function(indicatorMessage){
		if (indicatorMessage === ""){
			indicatorLabel.text = "Loading...";
		}
		else{
			indicatorLabel.text = indicatorMessage;
		}
		var intervalLength = 1000; 
		var ttk = 10000; 
		var timeout = 7000; 
		var timeElapsed = 0; 
		
		function loadingAnimation(){
			 if (timeElapsed >= ttk){
			 	win2.close(); 
			 	clearInterval(hub.API.loaderAnimate);
			 }
			 if (timeElapsed >= timeout){
			 	indicatorLabel.text = "Hub mobile is taking too long to respond please try again in a few minutes."
			 }
			 timeElapsed += intervalLength; 
			 Ti.API.info(timeElapsed/1000);
			 
		}
		hub.API.loaderAnimate = setInterval(loadingAnimation,intervalLength);
		win2.addEventListener('open', function (e) {
			indicator.show();
			});
			win2.open();
		}

	hideIndicator = function(){
		win2.close();
		clearInterval(hub.API.loaderAnimate);
	}
	
	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
	});
	
	var openPage = function(_page){
		var pageURL = 'ui/common/dashboardViews/' + _page;
		PageView = require(pageURL);
	    pageView = new PageView();
		hub.API.openWindow(pageView);
	}

	var searchImage = Ti.UI.createImageView({
		top:5*hsf,
		width:90*wsf,
		left:5*wsf, 
		image:hub.API.imagePath("search.png")
	});

	searchImage.addEventListener('click', function(){
		Ti.App.fireEvent('loadExploration');
	});

	Ti.App.addEventListener('loadExploration', function(){
		Exploration = require("services/Exploration");
		hub.API.explorer = new Exploration();
		openPage("ExploreView");
	});

	var offersImage = Ti.UI.createImageView({
		top:205*hsf,
		width:90*wsf, 
		left:5*wsf, 
		image:hub.API.imagePath("offers.png")
	});
	
	offersImage.addEventListener('click', function(){
		openPage("OffersView");
	});
	
	var peopleImage = Ti.UI.createImageView({
		top:405*hsf,
		width:90*wsf, 
		left:5*wsf, 
		image:hub.API.imagePath("people.png")
	});
	
	peopleImage.addEventListener('click', function(){
		openPage("PeopleView");
	});
	
	var profileImage = Ti.UI.createImageView({
		top:5*hsf,
		width:90*wsf,
		left:150*wsf, 
		image:hub.API.imagePath("profile.png")
	});
	profileImage.addEventListener('click', function(){
		hub.API.fetchProfileInfo({
			start: function(){
				showIndicator("Fetching profile information ...");
			},
			error: function(){
				Ti.API.info("Error Fetching information");
				hideIndicator(); 
			},
			success: function(response){
				hub.API.user.profile = response
				hideIndicator();
				openPage("ProfileView");
				
			}
		});
		
	});
	
	var needsImage = Ti.UI.createImageView({
		top:205*hsf,
		width:90*wsf, 
		left:150*wsf, 
		image:hub.API.imagePath("needs.png")
	});
	needsImage.addEventListener('click', function(){
		openPage("NeedsView");
	});
	
	var inboxImage = Ti.UI.createImageView({
		top:405*hsf,
		width:90*wsf, 
		left:150*wsf, 
		image:hub.API.imagePath("inbox.png")
	});

	Ti.App.addEventListener("showMessagePage", function(){
		hideIndicator();
		Ti.API.info("Messages found. ");
		openPage("InboxView");
	})
	
	inboxImage.addEventListener('click', function(){
		hub.API.fetchMessages("count", 0);
		Ti.App.fireEvent("Messages");
		showIndicator("Fetching messages ...");
	});
	
	var activityImage = Ti.UI.createImageView({
		top:5*hsf,
		width:90*wsf,
		left:300*wsf, 
		image:hub.API.imagePath("activity.png")
	});
	activityImage.addEventListener('click', function(){
		openPage("ActivityView");
	});
	
	var eventsImage = Ti.UI.createImageView({
		top:205*hsf,
		width:90*wsf, 
		left:300*wsf, 
		image:hub.API.imagePath("events.png")
	});
	eventsImage.addEventListener('click', function(){
		openPage("EventsView");
	});
	
	var settingsImage = Ti.UI.createImageView({
		top:405*hsf,
		width:90*wsf, 
		left:300*wsf, 
		image:hub.API.imagePath("settings.png")
	});
	settingsImage.addEventListener('click', function(){
		openPage("SettingsView");
	});

	self.add(searchImage);
	self.add(offersImage);
	self.add(peopleImage);
	self.add(profileImage);
	self.add(needsImage);
	self.add(inboxImage);
	self.add(activityImage);
	self.add(eventsImage);
	self.add(settingsImage);
	
	contentWrapper.add(self);
	
	return win;

}	
module.exports = DashboardView;*/