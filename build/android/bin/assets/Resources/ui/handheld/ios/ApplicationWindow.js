//Application Window Component Constructor
function ApplicationWindow() {
	
	//create object instance
	var self = Ti.UI.createWindow({
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
		Ti.API.info("Closed the iphone window.");
	}
	this.openMainWindow = function(){
		self.open();
	}
};
module.exports = ApplicationWindow;