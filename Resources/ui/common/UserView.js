function userView(){
	
	var utilities = require("ui/common/utilities");
	util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	
	var win = Ti.UI.createWindow({
		backgroundColor: util.customBgColor,
		layout:'vertical',
	}); 
	
	var canvas = Ti.UI.createView({});
	
	win.titleImage = util.imagePath("ashoka_logo_navbar.png");
	var contentWrapper = Ti.UI.createView({
	    top: 5*hsf,
	    width: util.app_width,
	});	
	var logoutButton = Ti.UI.createButton({title:'Sign out'});
	
	logoutButton.addEventListener('click', function()
	{	
		//Ti.App.fireEvent('logout');
		Ti.App.globalWindow = win;
		Ti.App.fireEvent('closeWindow',{});
	});
	
	var helpButton = Ti.UI.createButton({title:'Help'});
	win.leftNavButton = logoutButton;
	win.rightNavButton = helpButton;
	
	canvas.add(contentWrapper);
	
	canvas.add(Titanium.UI.createLabel({
		left:20*wsf,
		height:50*hsf,
		bottom:1,
		font:{
	      fontSize:12*hsf,
	      fontFamily: util.customFont
	   },
	   color:util.customTextColor,
		text: 'Copyright 2011 Ashoka ',
	}));
	
	canvas.add(Titanium.UI.createLabel({
		right:20*wsf,
		height:50*hsf,
		bottom:1,
		font:{
	      fontSize:12*hsf,
	      fontFamily: util.customFont
	   },
	   color:util.customTextColor,
		text: 'hub.ashoka.org ',
	}));

	win.add(canvas);
	
	
	this.open = function(){
		win.open();
	};
	this.close = function(){
		win.close();
	};
	this.addContent = function(_content){
		contentWrapper.add(_content);

	};

	userView.prototype.appwin = win; 
	
}

module.exports = userView;


