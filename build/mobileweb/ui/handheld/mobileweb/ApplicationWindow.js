//Application Window Component Constructor
function ApplicationWindow() {

	var win = Titanium.UI.createWindow({
	});
	
	LoginView = require('ui/common/LoginView');
	var loginView = new LoginView();
	
    var tab = Titanium.UI.createTab({
            window: loginView
        });
 
    var tabGroup = Titanium.UI.createTabGroup();
    tabGroup.addTab(tab);

	this.openNewWindow = function(){
		Titanium.UI.currentTab.open(Ti.App.globalWindow);
	}
	this.openMainWindow = function(){
		 tabGroup.open();
		}
	this.closeWindow = function(){
		Ti.App.globalWindow.close();
	}
	
	//return self;
};
module.exports = ApplicationWindow;