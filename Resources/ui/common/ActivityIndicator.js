function openWindow(_window){
	Ti.App.globalWindow = _window;
	Ti.App.fireEvent('openWindow',{});
}

// Reusable Activity/Loading screen for Titanium by bartlewis@gmail.com
function ActivityScreen() {
	//
	// Private methods and vars
	//

	var isControlsCreated = false;
	var view1, view2, indicator;

	function createControls(){
		if (isControlsCreated) {return;}
		var win = Ti.UI.createWindow({
			titleControl: false, 
			modal: true,
			navBarHidden: true,
	        tabBarHidden: true,
        });
		
		view1 = Ti.UI.createView({
			height:'100%',
			width:'100%',
			backgroundColor:'#000',
			opacity:0.5,
			zIndex:8
		});
		view1.hide();
		win.add(view1);

		view2 = Ti.UI.createView({
			height:'100%',
			width:'100%',
			zIndex:9
		});
		view2.hide();

    	win.add(view2);
		openWindow(win);
		
		var style;
		if (Ti.Platform.name === 'iPhone OS'){
		  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
		}
		else {
		  style = Ti.UI.ActivityIndicatorStyle.DARK;
		}
		indicator = Titanium.UI.createActivityIndicator({
			//style:style,
			font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
			color:'#FFF',
			message:'Loading...',
			height:'100%',
			width:'auto'
		});
		view2.add(indicator);

		isControlsCreated = true;
	}

	//
	// Public methods stored in api
	//

	this.show = function(message){
		createControls();

		if (message) {indicator.message = message;}
		else {indicator.message = 'Loading...';}

		view1.show();
		view2.show();
		indicator.show();
	};

	this.hide = function(){
		createControls();

		view1.hide();
		view2.hide();
		indicator.hide();
		Ti.App.fireEvent("closeWindow");
	};
};
module.exports = ActivityScreen;
