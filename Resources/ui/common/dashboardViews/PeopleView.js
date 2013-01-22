var utilities = require("ui/common/utilities");
var util = new utilities();
var hsf = util.height_scale_factor;
var wsf = util.width_scale_factor;
var margin_offset = (util.app_width-350*wsf)/2;
var all_activity_offset = 0; 
var select_activity_offset = 30; 
var user = Ti.App.user; 

function PeopleView(_authToken){

	var appWindow = require("ui/common/UserView");
    win = new appWindow();

	var self = Ti.UI.createView({
		backgroundColor:util.customBgColor,
	});
	
	
	var allActivities = Ti.UI.createLabel({
		top:105,
		text: "People Page", 
		color: util.customTextColor,
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
module.exports = PeopleView;