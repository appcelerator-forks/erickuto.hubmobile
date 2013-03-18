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
		
	if (hub.API.osname === "android"){
		
		var win2 = Ti.UI.createWindow({
		  backgroundColor: 'yellow',
		  fullscreen: true
		});
		win2.add(indicator);
	
		// eventListeners must always be loaded before the event is likely to fire
		// hence, the open() method must be positioned before the window is opened
		win2.addEventListener('open', function (e) {
		  indicator.show();
		  // do some work that takes 6 seconds
		  // ie. replace the following setTimeout block with your code
		  /*setTimeout(function(){
		    e.source.close();
		    activityIndicator.hide();
		  }, 6000);*/
		});
	}
	else{
		//For iphone and mobile web
		indicatorHolder = Ti.UI.createView({
			top:0,
			height:'100%',
			width:'100%',
			backgroundColor:'grey',
			opacity:1,
			zIndex:9
		});
		
		indicatorHolder.hide();
			
		indicatorHolder.add(indicator);
		canvas.add(indicatorHolder);
	}
	
	
		
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
	
	this.showIndicator = function(indicatorMessage){
		if (hub.API.osname === "android"){
			win2.open();
		}
		else{
			contentWrapper.opacity = 0.3; 
			contentWrapper.zIndex = 8;
			indicatorHolder.show();
			indicator.show();
		}
		
	}

	this.hideIndicator = function(){
		if (hub.API.osname === "android"){
			win2.close();
			indicator.hide();
		}
		else{
			contentWrapper.opacity = 1.0; 
			contentWrapper.zIndex = 9;
			indicatorHolder.hide();
			indicator.hide();
		}
	}
	CommonLoginView.prototype.appwin = win; 
}

module.exports = CommonLoginView;


