exports.NavigationController = function() {
	this.windowStack = [];
};

exports.NavigationController.prototype.open = function(/*Ti.UI.Window*/windowToOpen) {
	//add the window to the stack of windows managed by the controller
	this.windowStack.push(windowToOpen);

	//grab a copy of the current nav controller for use in the callback
	var that = this;
	windowToOpen.addEventListener('close', function() {
		that.windowStack.pop();
	});
	
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
	
}

//go back to the initial window of the NavigationController
exports.NavigationController.prototype.home = function() {
	//store a copy of all the current windows on the stack
	var windows = this.windowStack.concat([]);
	for(var i = 1, l = windows.length; i < l; i++) {
		(this.navGroup) ? this.navGroup.close(windows[i]) : windows[i].close();
	}
	this.windowStack = [this.windowStack[0]]; //reset stack
};
