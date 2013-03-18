function StartupController() {

	var mainWindow = Ti.UI.createWindow({
		backgroundColor: "green",
		layout:'vertical',
	});
	mainWindow.open();
	var loginController = require("common/controllers/LoginController");
	liController = new loginController();
}

module.exports = StartupController;
