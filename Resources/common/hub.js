/*
 * MVC namespace contains the resources for the MVC example app.
 */
var HUB = {}; 


/*
 * MVC.ui resources.
 */
HUB.ui = {};
Ti.include(
	'controllers/LoginController.js',
	'views/LoginView.js',
	'controllers/StartupController.js'
);

var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;

// iPhone makes use of the platform-specific navigation controller,
// all other platforms follow a similar UI pattern
if (osname === 'iphone') {
	Ti.include('../ipod/ApplicationView.js', '../ipod/ProfileView.js');
}
else if(osname === 'ipad'){
	Ti.include('../ipad/ApplicationView.js', '../ipad/ApplicationView.js');
}
else if (osname === 'mobileweb'){
	Ti.include('../mobileweb/ApplicationView.js', '../mobileweb/ProfileView.js');
}
else {
	Ti.include('../android/ApplicationView.js', '../android/ProfileView.js');
}
