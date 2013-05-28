function AboutView(_authToken){

	var appWindow = require("ui/common/UserView");
    win = new appWindow();

	hub = require("hub");
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	
	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
	});
	
	
	var allActivities = Ti.UI.createLabel({
		top:105,
		text: "My Tags", 
		color: hub.API.customTextColor,
		height: 40,
		font: {
			fontSize: 28
		},
		left: 35,
	});

	self.add(allActivities);

	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
	}	
module.exports = AboutView;