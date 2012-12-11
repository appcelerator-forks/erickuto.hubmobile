var myApp = {}; 

myApp.ui = require("login");
myApp.ui.mainWindow = myApp.ui.win; 
myApp.ui.mainWindow.open();

Ti.App.addEventListener('grantEntrance', function(event)
{
	myApp.ui.mainWindow.close();
  	myApp.dashboard = require("dashboard");
  	myApp.dashboard.createDashboard(event.name, event.email);
});

Ti.App.addEventListener('denyEntrance', function(event)
{
	myApp.ui.showLoginFail();
});