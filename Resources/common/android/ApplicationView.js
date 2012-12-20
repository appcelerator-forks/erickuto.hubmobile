HUB.ui.ApplicationView = (function(){
	
	//Page Wrapper. 
	
	var contentWrapper = Ti.UI.createView({
		    top: 145,
		});
	function buildApplicationWindow(){
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
			image:'images/ashoka_logo.png', 
			top:25,
			width:300
		});
		
		var logoCanvas = Ti.UI.createView({top:0, height:120});
		var borderBottom = Ti.UI.createView({
		    backgroundColor: '#e0e0e0',
		    top: 140,
		    height:2,
		});
		
		canvas.add(borderBottom);
		logoCanvas.add(logoImage);
		canvas.add(contentWrapper);
		/*logo
		var logoRow = Ti.UI.createTableViewRow({
			backgroundColor:'white', 
			height: 'auto'
		});
		*/
		canvas.add(logoCanvas);
		
		/*Form row
		var formRow = Ti.UI.createTableViewRow({
			backgroundColor:'red', 
			height:'300',
		});
		*/
		
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
		
		return win;		
	}
	
	function addContent(content){
		contentWrapper.add(content);
	}
	return {
        buildMainWindow: function(){
            var mainWindow = buildApplicationWindow();
            return mainWindow;
        }, 
        addContent: function(content){
        	addContent(content);
        }
    };
	
})();
