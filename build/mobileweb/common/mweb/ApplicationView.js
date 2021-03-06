function CommonLoginView(){
	
	var utilities = require("common/utilities");
	util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	
	var win = Ti.UI.createWindow({
		backgroundColor: util.customBgColor,
		layout:'vertical',
	}); 
	
	var canvas = Ti.UI.createView({});

	var logoImage = Ti.UI.createImageView({
		top:15*hsf,
		width:300*wsf
	});
	
	util.addImage(logoImage, "images/ashoka_logo.png");
	var logoCanvas = Ti.UI.createView({top:0, height:120});
	var borderBottom = Ti.UI.createView({
	    backgroundColor: '#e0e0e0',
	    top: 140*hsf,
	    height:2*hsf,
	});

	var contentWrapper = Ti.UI.createView({
	    top: 145*hsf,
	    width: util.app_width,
	});	
	canvas.add(borderBottom);
	logoCanvas.add(logoImage);
	canvas.add(contentWrapper);

	canvas.add(logoCanvas);
	
	canvas.add(Titanium.UI.createLabel({
		left:20*wsf,
		height:50*hsf,
		bottom:1,
		font:{
	      fontSize:12*hsf,
	      fontFamily: util.customFont
	   },
	   color:util.customTextColor,
		text: 'Copyright 2011 Ashoka ' + util.app_width + " height " + util.app_height,
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
		text: 'hub.ashoka.org ' + util.width_scale_factor + " height " + util.height_scale_factor,
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

	CommonLoginView.prototype.appwin = win; 
}

module.exports = CommonLoginView;


