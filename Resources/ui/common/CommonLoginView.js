function CommonLoginView(){
	
	hub = require("hub");
	var utilities = require("ui/common/utilities");
	util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;

	modal = false; 
	if (hub.API.osname === 'mobileweb'){
		modal = true;
	}
	
	var win = Ti.UI.createWindow({
		backgroundColor: util.customBgColor,
		layout:'vertical',
		navBarHidden: true, 
		tabBarHidden: true,
		modal: modal,
	}); 
	
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
	
	//Style for the indicator. 
	var style;
	if (Ti.Platform.name === 'iPhone OS'){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
	}
	else {
	  style = Ti.UI.ActivityIndicatorStyle.BIG;
	}
	
	indicatorHolder = Ti.UI.createView({
		height: "100",
		backgroundColor: "#000", 
		layout: "horizontal", 
		width: "90%", 
		opacity: 0.8,
	});
	
	indicator = Titanium.UI.createActivityIndicator({
		style:style,
		font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
		color:'#FFF',
		height:70,
		width:70,
		left: 5, 
	});

	indicatorLabel = Ti.UI.createLabel({
		font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
		color: "#FFF", 
		text: "Loading...", 
		width: "auto", 
		height: "auto", 
		left: "10", 
	}); 
	
	indicatorHolder.add(indicator); 
	indicatorHolder.add(indicatorLabel);
	
	var win2 = Ti.UI.createWindow({
	  backgroundColor: '#000',
	  opacity: 0.5,
	  navBarHidden: true,
	});
	win2.add(indicatorHolder);

	this.addContent = function(_content){
		contentWrapper.add(_content);
	};

	this.showNavBar = function(){
		if (hub.API.osname === 'android'){
			return
		}
		win.navBarHidden = false;
		win.tabBarHidden = false;
	};
	this.hideNavBar = function(){
		if (hub.API.osname === 'android'){
			return
		}
		win.navBarHidden = true;
		win.tabBarHidden = true;
	}
	
	this.showIndicator = function(indicatorMessage){
		if (indicatorMessage === ""){
			indicatorLabel.text = "Loading...";
		}
		else{
			indicatorLabel.text = indicatorMessage;
		}
		var intervalLength = 1000; 
		var ttk = 10000; 
		var timeout = 7000; 
		var timeElapsed = 0; 
		
		function loadingAnimation(){
			 if (timeElapsed >= ttk){
			 	win2.close(); 
			 	clearInterval(hub.API.loaderAnimate);
			 }
			 if (timeElapsed >= timeout){
			 	indicatorLabel.text = "Hub mobile is taking too long to respond please try again in a few minutes."
			 }
			 timeElapsed += intervalLength; 
			 Ti.API.info(timeElapsed/1000);
			 
		}
		hub.API.loaderAnimate = setInterval(loadingAnimation,intervalLength);
		win2.addEventListener('open', function (e) {
			indicator.show();
			});
			win2.open();
		}

	this.hideIndicator = function(){
		win2.close();
		clearInterval(hub.API.loaderAnimate);
	}
	CommonLoginView.prototype.appwin = win; 
	
}

module.exports = CommonLoginView;


