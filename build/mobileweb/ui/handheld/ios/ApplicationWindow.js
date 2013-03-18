//Application Window Component Constructor
function ApplicationWindow() {
	
	//create object instance
	var self = Ti.UI.createWindow({
	});
	
	var rootWindow = Ti.UI.createWindow({
		backgroundColor: "black"
	});
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:rootWindow
	});
	self.add(navGroup);
	
	this.openNewWindow = function(newWindow){
		navGroup.open(newWindow);
	}
	this.closeWindow = function(){
		navGroup.close(Ti.App.globalWindow);
	}
	this.openMainWindow = function(){
		self.open();
		LoginView = require('ui/common/LoginView');
		var loginView = new LoginView();
		navGroup.open(loginView);
	}
};
module.exports = ApplicationWindow;