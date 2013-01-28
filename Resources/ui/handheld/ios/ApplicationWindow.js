//Application Window Component Constructor
function ApplicationWindow() {
	
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:hubAPI.customBgColor,
	});
	
	
	LoginView = require('ui/common/LoginView');
	var loginView = new LoginView();
	
	/*SearchView = require("ui/common/dashboardViews/exploreViews/SearchView");
	var searchView = new SearchView; */
	
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