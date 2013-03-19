function CommonLoginView(){
	
	hub = require("hub");
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	
	var win = Ti.UI.createWindow({
		backgroundColor: hub.API.customBgColor,
		//layout:'vertical',
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
	    zIndex:9, 
	    opacity: 1,
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
	
	//Style for the indicator. 
	var style;
	if (Ti.Platform.name === 'iPhone OS'){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}
	else {
	  style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	
	indicator = Titanium.UI.createActivityIndicator({
		style:style,
		font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
		color:'#FFF',
		message:'Loading...',
		height:'100%',
		width:'auto'
	});

	var win2 = Ti.UI.createWindow({
	  backgroundColor: '#000',
	  opacity: 0.5,
	  fullscreen: true
	});
	win2.add(indicator);
	
	win2.addEventListener('open', function (e) {
	  indicator.show();
	});
	
		
	this.open = function(){
		win.open();
	};
	this.close = function(){
		win.close();
	};
	this.addContent = function(_content){
		contentWrapper.add(_content);
	};

	this.showNavBar = function(){
		win.navBarHidden = false;
		win.tabBarHidden = false;
	};
	this.hideNavBar = function(){
		win.navBarHidden = true;
        win.tabBarHidden = true;
	}
	
	this.showIndicator = function(indicatorMessage){
		
		hub.API.openWindow(win2);
	}

	this.hideIndicator = function(){
		hub.API.closeWindow(win2);
		indicator.hide();
	}
	CommonLoginView.prototype.appwin = win; 
}

module.exports = CommonLoginView;


