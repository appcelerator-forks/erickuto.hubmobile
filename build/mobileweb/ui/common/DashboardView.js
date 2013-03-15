
function openPage(_page){
	var pageURL = 'ui/common/dashboardViews/' + _page;
	PageView = require(pageURL);
    pageView = new PageView();
	
	Ti.App.globalWindow = pageView;
	Ti.App.fireEvent('openWindow',{});
}

function DashboardView(){
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
	
	if (hub.API.osname === "mobileweb" || hub.API.osname === "android"){
		var navigationBarHolder = Ti.UI.createView({
			top:0, 
			width: hub.API.app_width, 
			height: 85*hsf, 
			backgroundImage: hub.API.imagePath("navbar_background.png"),
		});
		
		topLeftButton = Ti.UI.createImageView({
			left: 5, 
			top: 6,
			height: 63*hsf,
			image: hub.API.imagePath("sign_out.png"),
			backgroundColor: '#d0ddef',
			});
				
		topRightButton = Ti.UI.createImageView({
			right: 5, 
			top: 6,
			height: 63*hsf,
			image: hub.API.imagePath("help.png"),
			backgroundColor: '#d0ddef',
			});
		
		ashoka_logo = Ti.UI.createImageView({
			top:6, 
			image: hub.API.imagePath("ashoka_logo_navbar.png"),
		});
		topRightButton.addEventListener('click', function()
		{	
			Ti.App.globalWindow = win;
			Ti.App.fireEvent('closeWindow',{});
		});
		
		
		navigationBarHolder.add(topLeftButton);
		navigationBarHolder.add(topRightButton);
		navigationBarHolder.add(ashoka_logo);
			topLeftButton.addEventListener('click', function()
		{	
			Ti.App.globalWindow = win;
			Ti.App.fireEvent('closeWindow',{});
		});
		
				
		topRightButton.addEventListener('click', function()
		{	
			Ti.App.globalWindow = win;
			Ti.App.fireEvent('closeWindow',{});
		});
		canvas.add(navigationBarHolder);
	}
	else if (hub.API.osname === "iphone" || hub.API.osname === "ipad"){
		win.showNavBar(); 
		win.titleImage = hub.API.imagePath("ashoka_iphone_logo_navbar.png");
		win.barColor = '#d0ddef';

		var topLeftButton = Ti.UI.createButtonBar({
			labels: [{title:'Sign Out', image:hub.API.imagePath("back_nav_btn.png")}],
			backgroundColor: '#d0ddef',
			width:60,
		});

		topLeftButton.addEventListener('click', function()
		{	
			Ti.App.globalWindow = win;
			Ti.App.fireEvent('closeWindow',{});
		});

		var helpButton = Ti.UI.createButtonBar({
		//backgroundImage: hub.API.imagePath("home_nav_btn.png"),
			labels: [{title:' Help', image:hub.API.imagePath("help_nav_btn.png")}],
			backgroundColor: '#d0ddef',
			width:60,
		});

		win.leftNavButton = topLeftButton;
		win.rightNavButton = helpButton;
	}

	var contentWrapper = Ti.UI.createView({
	    width: hub.API.app_width,
	});	
	canvas.add(contentWrapper);
	
	win.add(canvas);

	win.close = function(){
		Ti.App.globalWindow = win;
		Ti.App.fireEvent('closeWindow',{});
	};
	win.addContent = function(_content){
		contentWrapper.add(_content);
	};
	win.addOnCloseEvent = function(_action){
		win.addEventListener('close', function(){
			Ti.App.fireEvent(_action);
		});
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
		openPage("ProfileView");
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

	inboxImage.addEventListener('click', function(){
		hub.API.fetchMessages("count", 0);
		Ti.App.fireEvent("Messages");
		if (hub.API.messages.isReady()){
			hub.API.messages.changeReadyState(false);
		}
		InboxView = require("ui/common/dashboardViews/InboxView");
		var inboxView = new InboxView; 
		Ti.App.globalWindow = inboxView;
		Ti.App.fireEvent('openWindow',{});
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
	
	win.addContent(searchImage);
	win.addContent(offersImage);
	win.addContent(peopleImage);
	win.addContent(profileImage);
	win.addContent(needsImage);
	win.addContent(inboxImage);
	win.addContent(activityImage);
	win.addContent(eventsImage);
	win.addContent(settingsImage);

	return win;
}	
module.exports = DashboardView;