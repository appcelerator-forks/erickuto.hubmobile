function CommonLoginView(){
	
	hub = require("hub");
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	
	var win = Ti.UI.createWindow({
		backgroundColor: hub.API.customBgColor,
		layout:'vertical',
		titleControl: false, 
		modal: true,
		navBarHidden: true,
        tabBarHidden: true,
	}); 
	if (hub.API.osname === "iphone" || hub.API.osname === "ipad"){
		win.hideNavBar(); 
	}
	var canvas = Ti.UI.createView({});
	
	var logoImage = Ti.UI.createImageView({
		top:15*hsf,
		width:300*wsf, 
		image:hub.API.imagePath("ashoka_logo.png")
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
	    width: hub.API.app_width,
	});	
	canvas.add(contentWrapper);
	canvas.ContentWrapper = contentWrapper; 
	
	canvas.add(borderBottom);
	logoCanvas.add(logoImage);
	canvas.add(logoCanvas);
	
	canvas.add(Titanium.UI.createLabel({
		left:20*wsf,
		height:50*hsf,
		bottom:1, //top:650
		font:{
	      fontSize:12*hsf,
	      fontFamily: hub.API.customFont
	   },
	   color:hub.API.customTextColor,
		text: 'Copyright 2011 Ashoka ',
	}));
	
	canvas.add(Titanium.UI.createLabel({
		right:20*wsf,
		height:50*hsf,
		bottom:1, //top:650
		font:{
	      fontSize:12*hsf,
	      fontFamily: hub.API.customFont
	   },
	   color:hub.API.customTextColor,
		text: 'hub.ashoka.org ',
	}));

	win.add(canvas);
	win.Canvas = canvas; 
	
	
	this.open = function(){
		win.open();
	};
	this.close = function(){
		win.close();
	};
	this.addContent = function(_content){
		canvas.ContentWrapper.add(_content);
	};

	this.showNavBar = function(){
		win.navBarHidden = false;
		win.tabBarHidden = false;
	};
	this.hideNavBar = function(){
		win.navBarHidden = true;
        win.tabBarHidden = true;
	}
	
	this.clearCanvas = function(){
		canvas.remove(canvas.ContentWrapper);
		newContentWrapper = Ti.UI.createView({
		    top: 145*hsf,
		    backgroundColor: "red",
		    width: hub.API.app_width,
		});	
		canvas.add(newContentWrapper);
		canvas.ContentWrapper = newContentWrapper;
	}
	
	CommonLoginView.prototype.appwin = win; 
}

module.exports = CommonLoginView;


