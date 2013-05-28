function userView(_page_name){
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
	var tl_button; 
	var helpButton; 

	if (hub.API.osname === "mobileweb"){
		var topNavigationBarHolder = Ti.UI.createView({
			top:0, 
			width: hub.API.app_width, 
			height: 85*hsf, 
			backgroundImage: hub.API.imagePath("navbar_background.png"),
		});
		
		tl_button = Ti.UI.createImageView({
			left: 5, 
			top: 6,
			width: 100*wsf,
			image: hub.API.imagePath("sign_out.png"),
			backgroundColor: '#d0ddef',
			});
				
		helpButton = Ti.UI.createImageView({
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
		helpButton.addEventListener('click', function()
		{	
			Ti.App.globalWindow = win;
			Ti.App.fireEvent('closeWindow',{});
		});
		
		topNavigationBarHolder.add(tl_button);
		topNavigationBarHolder.add(helpButton);
		topNavigationBarHolder.add(ashoka_logo);

		canvas.add(topNavigationBarHolder);
	}
	
	else if (hub.API.osname === "iphone" || hub.API.osname === "ipad"){
		win.showNavBar(); 
		win.titleImage = hub.API.imagePath("ashoka_iphone_logo_navbar.png");
		win.barColor = '#d0ddef';

		var tl_button = Ti.UI.createButtonBar({
			labels: [{title:'Sign Out', image:hub.API.imagePath("back_nav_btn.png")}],
			backgroundColor: '#d0ddef',
			width:60,
		});

		

		var helpButton = Ti.UI.createButtonBar({
		//backgroundImage: hub.API.imagePath("home_nav_btn.png"),
			labels: [{title:' Help', image:hub.API.imagePath("help_nav_btn.png")}],
			backgroundColor: '#d0ddef',
			width:60,
		});
		
		win.leftNavButton = tl_button;
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

	if (tl_button){
		tl_button.addEventListener('click', function()
		{	
			hub.API.closeWindow()
		});
	}
	
	
	helpEvent = function()
	{	
		hub.API.homeWindow();
	}	
	if (helpButton){
		helpButton.addEventListener('click', helpEvent);
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
		/*closed_pages = hub.API.homeWindow();
		while(!closed_pages){
			hub.API.homeWindow();
		}*/
		var pageURL = 'ui/common/dashboardViews/' + _page;
		PageView = require(pageURL);
	    pageView = new PageView();
		hub.API.openWindow(pageView);
	}
	
	var launch_event = function(icon_name){
		
		var icon_event = function(){}; 
		
		if (icon_name === "Profile"){
			icon_event = function(){
				hub.API.fetchNeon("/users/4139", {
					start: function(){
						showIndicator("Fetching profile information ...");
					},
					error: function(){
						Ti.API.info("Error Fetching information");
						hideIndicator(); 
					},
					success: function(response){
						hub.API.user.profile = response.userData;
						hideIndicator();
						openPage("ProfileView");
					}
				});
			}	
		}else if (icon_name == "Inbox"){
			icon_event = function(){
				hub.API.fetchMessages("count", 0, {
					start: function(){
						showIndicator("Fetching Messages ...");
					},
					error: function(){
						Ti.API.info("Error Fetching Messages");
						hideIndicator(); 
					},
					success: function(){
						hideIndicator();
						openPage("MessageView");
					}
				});
			}
		}
		else if(icon_name === "Activity"){
			var icon_event = function(){
				var o = {
					start: function(){
						showIndicator("Fetching Search Results ...");
					},
					error: function(){
						Ti.API.info("Error Search Results");
						hideIndicator(); 
					},
					success: function(){
						hideIndicator();
						openPage("ActivityView");
					}
				}; 
				
				hub.API.fetchActivity("activities/count", 0, o);
				
			} 
		}else if(icon_name === "Explore"){
			icon_event = function(){
				Exploration = require("services/Exploration");
				hub.API.explorer = new Exploration({
					start: function(){
						showIndicator("Fetching Exploration data ...");
					},
					error: function(){
						Ti.API.info("Error Fetching Exploration data");
						hideIndicator(); 
					},
					success: function(response){
						//hub.API.user.profile = response
						hideIndicator();
						openPage("ExploreView");
					}
				});
			}	
		}else if(icon_name === "Create"){
			var icon_event = function(){
				openPage("CreateView");
			};
		}else if(icon_name === "Inbox"){
			
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
		if (nav_icons[i] != _page_name){
			iconImage.addEventListener('click', icon_event); 
			iconHolder.backgroundColor = hub.API.customBgColor; 
		}
		else{
			iconHolder.backgroundColor = "#BDBDBD"; 
		}
		
		
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

	win.addOnCloseEvent = function(_action){
		win.addEventListener('close', function(){
			Ti.App.fireEvent(_action);
		});
	} 
	
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

	this.addContent = function(_content){
		contentWrapper.add(_content);
	};

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
	this.hideIndicator = hideIndicator; 
	this.showNavBar = showNavBar; 
	this.hideNavBar = hideNavBar; 
	this.showIndicator = showIndicator; 
	this.changeRightButtonEvent = function(_action, _image){
		helpButton.removeEventListener('click', helpEvent); 
		helpButton.addEventListener('click', _action);
		image_text = _image + "_nav_btn.png";
		helpButton.labels = [{title:_image, image:hub.API.imagePath(image_text)}]
	}
	this.addOnCloseEvent = function(_action){
		win.addEventListener('close', function(){
			Ti.App.fireEvent(_action);
		});
	} 
	userView.prototype.appwin = win; 
}

module.exports = userView;


