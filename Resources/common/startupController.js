function StartupController() {

	var loginController = require("common/controllers/LoginController");
	liController = new loginController();
}

module.exports = StartupController;
