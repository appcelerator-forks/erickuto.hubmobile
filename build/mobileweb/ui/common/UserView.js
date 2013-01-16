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
	win.barColor = '#d0ddef';
	
	var contentWrapper = Ti.UI.createView({
	    width: util.app_width,
	});	
	var logoutButton = Ti.UI.createButtonBar({
		labels: [{title:'Sign Out', image:util.imagePath("back_nav_btn.png")}],
		backgroundColor: '#d0ddef',
		width:60,
		});
	
	logoutButton.addEventListener('click', function()
	{	
		//Ti.App.fireEvent('logout');
		Ti.App.globalWindow = win;
		Ti.App.fireEvent('closeWindow',{});
	});
	
	var helpButton = Ti.UI.createButtonBar({
		//backgroundImage: util.imagePath("home_nav_btn.png"),
		labels: [{title:' Help', image:util.imagePath("help_nav_btn.png")}],
		backgroundColor: '#d0ddef',
		width:60,
		});
	
	win.leftNavButton = logoutButton;
	win.rightNavButton = helpButton;
	
	canvas.add(contentWrapper);
	
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


