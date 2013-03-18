if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else {
	// This is a single context application with multiple windows in a stack
	(function() {
		
		hub = require("hub");
		
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
		
		User = require("services/User");
		hub.API.user = new User();

		hub.API.mainWindow = new Window();
		hub.API.mainWindow.openMainWindow();
	})();
}

