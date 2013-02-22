function CommonLoginView(){
	
	var utilities = require("ui/common/utilities");
	util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	
	var win = Ti.UI.createWindow({
		backgroundColor: util.customBgColor,
		layout:'vertical',
		titleControl: false
	}); 
	win.hideNavBar(); 
	var canvas = Ti.UI.createView({});

	var logoImage = Ti.UI.createImageView({
		top:15*hsf,
		width:300*wsf, 
		image:util.imagePath("ashoka_logo.png")
	});
	//logoImage.image = '../../ashoka_logo.png';
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
	canvas.add(contentWrapper);
	canvas.add(borderBottom);
	logoCanvas.add(logoImage);
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

	hubAPI.startActivityIndicator = function(){
		canvas.remove(canvas.children[0]);
		canvas.add(hubAPI.indicatorView);
	}
	
	hubAPI.stopActivityIndicator = function(){
		canvas.remove(canvas.children[0]); 
		canvas.add(contentWrapper);
	}
	this.showNavBar = function(){
		win.showNavBar(); 
	};
	this.hideNavBar = function(){
		win.hideNavBar(); 
	}
	CommonLoginView.prototype.appwin = win; 
	
}

module.exports = CommonLoginView;

