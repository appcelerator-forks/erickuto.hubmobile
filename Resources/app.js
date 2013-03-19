if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else {
	// This is a single context application with multiple windows in a stack
	(function() {
		
		hub = require("hub");

		LoginView = require('ui/common/LoginView');
		var loginView = new LoginView();

		User = require("services/User");
		hub.API.user = new User();

		//open initial window
		hub.API.openWindow(loginView);
	})();
}

