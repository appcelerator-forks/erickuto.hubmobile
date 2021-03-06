function ProfileView(){
	
	var utilities = require("common/utilities");
	util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	
	var customFont = 'SpicyRice-Regular';
	var customBgColor = '#f9f9f9';
	var customTextColor = '#5e656a';
	var customTitleColor = '#0b395c';
	
	var win = Ti.UI.createWindow({
		backgroundColor:customBgColor,
		layout:'vertical',
	}); 
	var canvas = Ti.UI.createView({});

	var logoImage = Ti.UI.createImageView({
		top:25,
		width:300
	});
	util.addImage(logoImage, "images/ashoka_logo.png");
	
	var logoCanvas = Ti.UI.createView({top:0, height:120});
	var borderBottom = Ti.UI.createView({
	    backgroundColor: '#e0e0e0',
	    top: 140,
	    height:2,
	});

	var contentWrapper = Ti.UI.createView({
	    top: 145,
	    width:util.app_width
	});	
	canvas.add(borderBottom);
	logoCanvas.add(logoImage);
	canvas.add(contentWrapper);
	canvas.add(logoCanvas);
	
	canvas.add(Titanium.UI.createLabel({
		left:20,
		height:50,
		bottom:1,
		font:{
	      fontSize:12,
	      fontFamily: customFont
	   },
	   color:customTextColor,
		text: 'Copyright 2011 Ashoka'
	}));
	
	canvas.add(Titanium.UI.createLabel({
		right:20,
		height:50,
		bottom:1,
		font:{
	      fontSize:12,
	      fontFamily: customFont
	   },
	   color:customTextColor,
		text: 'hub.ashoka.org'
	}));

	win.add(canvas);

	function addImage(){
		var osname = Ti.Platform.osname;
		if (osname === 'android') {
			logoImage.image = "../../images/ashoka_logo.png";
		}
		else {
			logoImage.image = "images/ashoka_logo.png";
		}
	}
	
	this.open = function(){
		win.open();
	};
	this.close = function(){
		win.close();
	};
	this.addContent = function(_content){
		contentWrapper.add(_content);
	};
}

module.exports = ProfileView;