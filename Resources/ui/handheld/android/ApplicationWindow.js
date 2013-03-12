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
	
	this.openNewWindow = function(_win){
		Ti.App.globalWindow.modal = true;
		Ti.App.globalWindow.open();
	}
	this.openMainWindow = function(){
		self.open();
		}
	
	//return self;
};
module.exports = ApplicationWindow;