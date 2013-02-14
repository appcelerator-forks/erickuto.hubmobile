if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else {
	
	var hubAPI = {};
	
	hubAPI.startActivityIndicator = null; 
	hubAPI.stopActivityIndicator = null; 
	
	// This is a single context application with multiple windows in a stack
	(function() {
		//determine platform and form factor and render appropriate components
		var osname = Ti.Platform.osname,
			height = Ti.Platform.displayCaps.platformHeight,
			width = Ti.Platform.displayCaps.platformWidth;
		
		var Window;

		if (osname === 'android') {
			Window = require('ui/handheld/android/ApplicationWindow');
		}
		else if (osname === 'mobileweb') {
			Window = require('ui/handheld/mobileweb/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/ios/ApplicationWindow');
		}

		Settings = require("services/Settings");
		User = require("services/User");
		hubAPI.user = new User();
		
		
		var utilities = require("ui/common/utilities");
		var util = new utilities();
		hubAPI.util = util; 
		hubAPI.hsf = util.height_scale_factor;
		hubAPI.wsf = util.width_scale_factor;
		hubAPI.app_width = util.app_width; 
		hubAPI.margin_offset = (util.app_width-350*util.wsf)/2;
		hubAPI.customBgColor = util.customBgColor;
		hubAPI.customTextColor = util.customTextColor;
		hubAPI.imagePath = function(imagePath){
			return util.imagePath(imagePath);	
		}
		
		var mainWindow = new Window();
		mainWindow.openMainWindow();
		
		Ti.App.addEventListener('openWindow', function(event)
		{
			mainWindow.openNewWindow();
		});
		Ti.App.addEventListener('closeWindow', function(event)
		{
			mainWindow.closeWindow();
		});
		Ti.App.addEventListener('logout', function(event)
		{
			
		});
	})();
}

