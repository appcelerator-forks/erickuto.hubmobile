//Application Window Component Constructor
function ApplicationWindow() {
	
	var utilities = require("ui/common/utilities");
	var util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	var margin_offset = (util.app_width-350*wsf)/2;
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:util.customBgColor,
	});
	LoginView = require('ui/common/LoginView');
	var loginView = new LoginView();
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:loginView
	});
	self.add(navGroup);

	this.openNewWindow = function(){
		navGroup.open(Ti.App.globalWindow);
	}
	this.closeWindow = function(){
		navGroup.close(Ti.App.globalWindow);
	}
	this.openMainWindow = function(){
		self.open();
		}
};
module.exports = ApplicationWindow;