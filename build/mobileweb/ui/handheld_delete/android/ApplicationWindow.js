//Application Window Component Constructor
function ApplicationWindow() {
	
	LoginView = require('ui/common/LoginView');
	var self = new LoginView();
	self.exitOnClose = true;
	
	self.addEventListener('android:back', function (e) {
		self.open();
	});
	LoginView = require('ui/common/LoginView');
	var loginView = new LoginView();
	
	this.openNewWindow = function(){
		Ti.App.globalWindow.modal = true;
		Ti.App.globalWindow.open();
	}
	this.openMainWindow = function(){
		self.open();
		}
	this.closeWindow = function(){
		Ti.App.globalWindow.close();
	}
	//return self;
};
module.exports = ApplicationWindow;