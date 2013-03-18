//Application Window Component Constructor
function ApplicationWindow() {

	var rootWindow = Ti.UI.createWindow({
		backgroundColor: "black"
	});

    var tab = Titanium.UI.createTab({
            window: rootWindow
        });
 
    var tabGroup = Titanium.UI.createTabGroup();
    tabGroup.addTab(tab);

	this.openNewWindow = function(newWindow){
		Titanium.UI.currentTab.open(newWindow);
	}
	this.openMainWindow = function(){
		tabGroup.open();
		LoginView = require('ui/common/LoginView');
		var loginView = new LoginView();
		Titanium.UI.currentTab.open(loginView);
	}
	this.closeWindow = function(win){
		Titanium.UI.currentTab.close(win);
	}
	//return self;
};
module.exports = ApplicationWindow;