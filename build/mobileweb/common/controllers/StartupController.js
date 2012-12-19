/*
 * Startup (main) controller for the app.
 * 
 * The startup controller may init a DB for offline use, check for network availability,
 * inspect the users session (they may already be authenticated if we support 
 * remember-me mode), and redirect accordingly.
 */
HUB.ui.StartupController = (function() {

	function showLoginWindow() {
		HUB.ui.LoginController.init();
	}
	
	
	return {
		init: function() {
			showLoginWindow();
		}
	};

})();