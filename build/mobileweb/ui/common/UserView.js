function userView(){
	
	hub = require("hub");
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	var margin_offset = (hub.API.app_width-350*wsf)/2;
	
	var win = Ti.UI.createWindow({
		backgroundColor: hub.API.customBgColor,
		layout:'vertical',
		modal: true,
		navBarHidden: true,
        tabBarHidden: true,
	}); 
	//win.showNavBar(); 
	var canvas = Ti.UI.createView({
		top: 0, 
		width: hub.API.app_width, 
		layout: "vertical"
	});

	var navigationBarHolder = Ti.UI.createView({
		top:0, 
		width: hub.API.app_width, 
		height: 57*hsf, 
		backgroundImage: hub.API.imagePath("navbar_background.png"),
	});
	var contentWrapper = Ti.UI.createView({
	    width: hub.API.app_width,
	    zIndex:9, 
	    opacity: 1,
	});	
	canvas.add(navigationBarHolder);
	
	var topLeftButton = Ti.UI.createImageView({
		left: 5, 
		top: 6,
		height: 42*hsf,
		image: hub.API.imagePath("sign_out.png"),
		backgroundColor: '#d0ddef',
		});
	
	topLeftButton.addEventListener('click', function()
	{	
		Ti.App.globalWindow = win;
		Ti.App.fireEvent('closeWindow',{});
	});
	
	
	var topRightButton = Ti.UI.createImageView({
		right: 5, 
		top: 6,
		height: 42*hsf,
		image: hub.API.imagePath("help.png"),
		backgroundColor: '#d0ddef',
		});
	
	topRightButton.addEventListener('click', function()
	{	
		Ti.App.globalWindow = win;
		Ti.App.fireEvent('closeWindow',{});
	});
	navigationBarHolder.add(topLeftButton);
	navigationBarHolder.add(topRightButton);

	canvas.add(contentWrapper);
	
	win.add(canvas);
	
	this.open = function(){
		win.open();
	};
	this.close = function(){
		Ti.App.globalWindow = win;
		Ti.App.fireEvent('closeWindow',{});
	};
	this.addContent = function(_content){
		contentWrapper.add(_content);
	};
	this.addOnCloseEvent = function(_action){
		win.addEventListener('close', function(){
			Ti.App.fireEvent(_action);
		});
	} 
	this.showIndicator = function(indicatorMessage){
		indicatorHolder = Ti.UI.createView({
			top:0,
			height:'100%',
			width:'100%',
			backgroundColor:'#000',
			opacity:1,
			zIndex:9
		});
		indicator = Titanium.UI.createActivityIndicator({
			//style:style,
			font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
			color:'#FFF',
			message:'Loading...',
			height:'100%',
			width:'auto'
		});
		indicatorHolder.hide();
		indicatorHolder.add(indicator);
		canvas.add(indicatorHolder);
		contentWrapper.opacity = 0.3; 
		contentWrapper.zIndex = 8;
		indicatorHolder.show();
	}
	userView.prototype.appwin = win; 
}

module.exports = userView;


