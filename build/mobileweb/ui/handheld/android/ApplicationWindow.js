//Application Window Component Constructor
function ApplicationWindow() {
	
	var utilities = require("ui/common/utilities");
	var util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	var margin_offset = (util.app_width-350*wsf)/2;

	//create object instance
	/*var self = Ti.UI.createWindow({
		title:'Hub Mobile',
		backgroundColor:'#fff',
		exitOnClose:true,
		navBarHidden:false,
		activity: {
			onCreateOptionsMenu: function(e) {
			    var menu = e.menu;
			    var menuItem = menu.add({ title: "Refresh" });
			    menuItem.setIcon("images/refresh_icon.png");
			    menuItem.addEventListener("click", function(e) {
			    		refreshRSS();
			    });
			}
		}
	});
	*/
	
	LoginView = require('ui/common/LoginView');
	var self = new LoginView();
	self.exitOnClose = true;
	
	self.addEventListener('android:back', function (e) {
		self.open();
	});
	LoginView = require('ui/common/LoginView');
	var loginView = new LoginView();
	
	this.openNewWindow = function(_win){
		/*_win.modal = true; 
		_win.open();*/
		Ti.App.globalWindow.modal = true;
		Ti.App.globalWindow.open();
	}
	this.openMainWindow = function(){
		self.open();
		}
	
	//return self;
};
module.exports = ApplicationWindow;