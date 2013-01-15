function FirstTimeView(_authToken){
	
	var utilities = require("ui/common/utilities");
	var util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	var margin_offset = (util.app_width-350*wsf)/2;
	
	var appWindow = require("ui/common/UserView");
    win = new appWindow();

	var searchImage = Ti.UI.createImageView({
		top:5*hsf,
		width:100*wsf,
		left:10*wsf, 
		image:util.imagePath("search.png")
	});
	
	var offersImage = Ti.UI.createImageView({
		top:205*hsf,
		width:100*wsf, 
		left:10*wsf, 
		image:util.imagePath("offers.png")
	});
	
	var peopleImage = Ti.UI.createImageView({
		top:405*hsf,
		width:100*wsf, 
		left:10*wsf, 
		image:util.imagePath("people.png")
	});
	
	var profileImage = Ti.UI.createImageView({
		top:5*hsf,
		width:100*wsf,
		left:180*wsf, 
		image:util.imagePath("profile.png")
	});
	
	var needsImage = Ti.UI.createImageView({
		top:205*hsf,
		width:100*wsf, 
		left:180*wsf, 
		image:util.imagePath("needs.png")
	});
	
	var inboxImage = Ti.UI.createImageView({
		top:405*hsf,
		width:100*wsf, 
		left:180*wsf, 
		image:util.imagePath("inbox.png")
	});
	
	var activityImage = Ti.UI.createImageView({
		top:5*hsf,
		width:100*wsf,
		left:350*wsf, 
		image:util.imagePath("activity.png")
	});
	
	var eventsImage = Ti.UI.createImageView({
		top:205*hsf,
		width:100*wsf, 
		left:350*wsf, 
		image:util.imagePath("events.png")
	});
	
	var settingsImage = Ti.UI.createImageView({
		top:405*hsf,
		width:100*wsf, 
		left:350*wsf, 
		image:util.imagePath("settings.png")
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
module.exports = FirstTimeView;