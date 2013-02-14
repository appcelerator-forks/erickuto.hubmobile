function openPage(_page){
	var pageURL = 'ui/common/dashboardViews/' + _page;
	PageView = require(pageURL);
    pageView = new PageView();
	
	Ti.App.globalWindow = pageView;
	Ti.App.fireEvent('openWindow',{});
}

function DashboardView(){
	
	var utilities = require("ui/common/utilities");
	var util = new utilities();
	var hsf = util.magnified_height_scale_factor;
	var wsf = util.magnified_width_scale_factor;
	var margin_offset = (util.app_width-350*wsf)/2;
	
	var appWindow = require("ui/common/UserView");
    win = new appWindow();

	var searchImage = Ti.UI.createImageView({
		top:5*hsf,
		width:100*wsf,
		left:10*wsf, 
		image:util.imagePath("search.png")
	});
	
	searchImage.addEventListener('click', function(){
		Ti.App.fireEvent('loadExploration');
	});

	Ti.App.addEventListener('loadExploration', function(){
		Exploration = require("services/Exploration");
		hubAPI.explorer = new Exploration();
		openPage("ExploreView");
	});
	
	var offersImage = Ti.UI.createImageView({
		top:205*hsf,
		width:100*wsf, 
		left:10*wsf, 
		image:util.imagePath("offers.png")
	});
	
	offersImage.addEventListener('click', function(){
		openPage("OffersView");
	});
	
	var peopleImage = Ti.UI.createImageView({
		top:405*hsf,
		width:100*wsf, 
		left:10*wsf, 
		image:util.imagePath("people.png")
	});
	
	peopleImage.addEventListener('click', function(){
		openPage("PeopleView");
	});
	
	var profileImage = Ti.UI.createImageView({
		top:5*hsf,
		width:100*wsf,
		left:180*wsf, 
		image:util.imagePath("profile.png")
	});
	profileImage.addEventListener('click', function(){
		openPage("ProfileView");
	});
	
	var needsImage = Ti.UI.createImageView({
		top:205*hsf,
		width:100*wsf, 
		left:180*wsf, 
		image:util.imagePath("needs.png")
	});
	needsImage.addEventListener('click', function(){
		openPage("NeedsView");
	});
	
	var inboxImage = Ti.UI.createImageView({
		top:405*hsf,
		width:100*wsf, 
		left:180*wsf, 
		image:util.imagePath("inbox.png")
	});
	inboxImage.addEventListener('click', function(){
		openPage("InboxView");
	});
	
	var activityImage = Ti.UI.createImageView({
		top:5*hsf,
		width:100*wsf,
		left:350*wsf, 
		image:util.imagePath("activity.png")
	});
	activityImage.addEventListener('click', function(){
		openPage("ActivityView");
	});
	
	var eventsImage = Ti.UI.createImageView({
		top:205*hsf,
		width:100*wsf, 
		left:350*wsf, 
		image:util.imagePath("events.png")
	});
	eventsImage.addEventListener('click', function(){
		openPage("EventsView");
	});
	
	var settingsImage = Ti.UI.createImageView({
		top:405*hsf,
		width:100*wsf, 
		left:350*wsf, 
		image:util.imagePath("settings.png")
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
	thisWindow = win.appwin;
	return thisWindow;
}	
module.exports = DashboardView;