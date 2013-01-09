//Application Window Component Constructor
function ApplicationWindow() {
	
	var utilities = require("common/utilities");
	var util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	var margin_offset = (util.app_width-350*wsf)/2;
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:util.customBgColor,
	});
	LoginView = require('ui/common/LoginView');
	var loginView = new LoginView();
	
	//declare module dependencies
	/*var rss = require('services/rss'),
		MainView = require('ui/common/MainView'),
		ProfileView = require('ui/common/ProfileView');
*/
	
	//create detail view container
	//var detailContainerWindow = Ti.UI.createWindow();
	//detailContainerWindow.add(detailView);

	//create Mobile Web specific NavGroup UI
	
	var navGroup = Ti.UI.MobileWeb.createNavigationGroup({
		window:loginView
	});
	self.add(navGroup);

	this.openNewWindow = function(_win){
		navGroup.open(_win);
	}
	this.openMainWindow = function(){
		self.open();
		}
	//add behavior for master view
	/*masterView.addEventListener('itemSelected', function(e) {
		detailView.showArticle(e.link);
		navGroup.open(detailContainerWindow);
	});
	
	function refreshRSS() {
		rss.loadRssFeed({
			success: function(data) {
	    		masterView.refreshRssTable(data);
	    	}
		});
	}
	*/
	// load initial rss feed
	//refreshRSS();
	
	//return self;
};
module.exports = ApplicationWindow;