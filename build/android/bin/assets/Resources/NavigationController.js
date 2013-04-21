exports.NavigationController = function() {
	this.windowStack = [];
};

exports.NavigationController.prototype.open = function(/*Ti.UI.Window*/windowToOpen) {
	Ti.API.info("Adding a window to " + this.windowStack.length.toString() + " Windows.");
	//add the window to the stack of windows managed by the controller
	this.windowStack.push(windowToOpen);
	
	//hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
	windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;
	
	//This is the first window
	if(this.windowStack.length === 1) {
		if(Ti.Platform.osname === 'iphone') {
			this.navGroup = Ti.UI.iPhone.createNavigationGroup({
				window : windowToOpen
			});
			var containerWindow = Ti.UI.createWindow();
			containerWindow.add(this.navGroup);
			containerWindow.open();
		}
		else if (Ti.Platform.osname === 'mobileweb') {
			this.navGroup = Ti.UI.MobileWeb.createNavigationGroup({
				window : windowToOpen
			});
			var containerWindow = Ti.UI.createWindow();
			containerWindow.add(this.navGroup);
			containerWindow.open();
		}
		else {
			windowToOpen.exitOnClose = true;
			windowToOpen.open();
		}
	}
	//All subsequent windows
	else {
		if(Ti.Platform.osname === 'iphone') {
			this.navGroup.open(windowToOpen);
		} 
		else if (Ti.Platform.osname === 'mobileweb'){
			this.navGroup.open(windowToOpen);
		}
		else {
			windowToOpen.open();
		}
	}
};

//Pops out the window from the stack. 
exports.NavigationController.prototype.close = function(){
	var windows = this.windowStack.concat([]);
	windowToClose = windows[windows.length-1];
	(this.navGroup) ? this.navGroup.close(windowToClose) : windowToClose.close(); 
	this.windowStack.pop();
}

//go back to the initial window of the NavigationController
exports.NavigationController.prototype.home = function() {

	for(var i = this.windowStack.length; i > 2; i--) {
		Ti.API.info("There are " + this.windowStack.length.toString() + " windows on Iteration: " + i.toString()); 
		var windows = this.windowStack.concat([]);
		windowToClose = windows[windows.length-1];
		(this.navGroup) ? this.navGroup.close(windowToClose) : windowToClose.close(); 
		this.windowStack.pop();
		Ti.API.info("After Removing, there are now " + this.windowStack.length.toString());
	}
	//this.windowStack = [this.windowStack[0]]; //reset stack
};
