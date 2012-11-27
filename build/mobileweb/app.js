var myApp = {}; 

myApp.ui = require("pages/login");

myApp.ui.mainWindow = myApp.ui.win; 
myApp.ui.mainWindow.open();