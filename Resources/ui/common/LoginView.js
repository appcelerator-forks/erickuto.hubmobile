function LoginView(){

	var hsf = hubAPI.hsf;
	var wsf = hubAPI.wsf;
	var margin_offset = (hubAPI.app_width-350*wsf)/2;
	
	var appWindow = require("ui/common/CommonLoginView");
    win = new appWindow();

	var errorPane = Ti.UI.createLabel({
				text:"",
				top:1, 
				left:margin_offset,
				font:{
			      fontSize:12*hsf,
			      fontFamily: hubAPI.customFont
			   },
				color:'red'
		});
			
	win.addContent(errorPane);
	var username = Titanium.UI.createTextField({
		top:20*hsf,
		width:350*wsf,
		height:60*wsf,
		font:{
	      fontSize:20*hsf,
	      fontColor:hubAPI.customTextColor,
	      fontFamily: hubAPI.customFont
	   },
		hintText:'Enter your email address',
		value:'ekkuto@gmail.com',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
		borderColor:'#e0e0e0',
		borderRadius:5,
		borderWidth:1,
	});
	
	var password = Titanium.UI.createTextField({
		color:hubAPI.customTextColor,
		top:100*hsf,
		width:350*wsf,
		height:60*wsf,
		font:{
	      fontSize:20*hsf,
	      fontFamily: hubAPI.customFont
	   },
		hintText:'Enter your Password',
		passwordMask:true,
		value:'v=O6tazfzj',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
		borderColor:'#e0e0e0',
		borderRadius:5,
		borderWidth:1,
	});
	
	var loginBtn = Titanium.UI.createButton({
		top:180*hsf,
		right:margin_offset,
		width:100*wsf,
		height:50*hsf,
		borderRadius:1,
		backgroundImage:hubAPI.imagePath('ashoka_login_btn.png'),
	});
	
	loginBtn.addEventListener('click',function(e)
		{
			username.blur();
			password.blur();
			if (username.value != '' && password.value != '')
			{
				Ti.App.fireEvent('handleLogin', {
				name:username.value,
				password:password.value
				});
			}
			else
			{
				alert("Username/Password are required");
			}
		});
		
	var forgotLabel = Titanium.UI.createLabel({
		left:margin_offset,
		height:50*hsf,
		top:240*hsf,
		font:{
	      fontSize:17*hsf,
	      fontFamily: hubAPI.customFont
	   },
	   color:hubAPI.customTextColor,
		text: 'Forgot Password?'
	});
	
	forgotLabel.addEventListener('click',function(e){
		handleForgotEvent();
		});
		
	var firstLabel = Titanium.UI.createLabel({
		right:margin_offset,
		height:50*hsf,
		font:{
	      fontSize:17*hsf,
	      fontFamily: hubAPI.customFont
	   },
		top:240*hsf,
		color:hubAPI.customTextColor,
		text: 'First time login'
	});
	firstLabel.addEventListener('click',function(e){
		handleFirstEvent();
		});
	
	var barLabel = Titanium.UI.createLabel({
		left:margin_offset + 200*wsf,
		height:50*hsf,
		font:{
	      fontSize:20*hsf,
	      fontFamily: hubAPI.customFont
	   },
		top:240*hsf,
		color:hubAPI.customTextColor,
		text: '|'
	});
	
	
	win.addContent(forgotLabel);
	win.addContent(username);
	win.addContent(barLabel);
	win.addContent(firstLabel);
	win.addContent(username);
	win.addContent(password);
	win.addContent(loginBtn);
	
	//Information row
	var infoRow = Ti.UI.createView({
		top:290*hsf, 
		height:300*hsf,
	});
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:87*hsf,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20*hsf, color:hubAPI.customTitleColor}
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:117*hsf,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20*hsf, color:hubAPI.customTitleColor}
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:147*hsf,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20*hsf, color:hubAPI.customTitleColor}
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:177*hsf,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20*hsf, color:hubAPI.customTitleColor}
	}));
	topicLabel = Ti.UI.createLabel({
		text: 'About Us',
		top:10*hsf, 
		left:10,
		font:{
	      fontSize:21*hsf,
	      fontWeight:'bold',
	      fontColor:hubAPI.customTitleColor,
	      fontFamily: hubAPI.customFont
	   },
		color:hubAPI.customTitleColor
	});
	
	var missionLabel = Ti.UI.createLabel({
		text: "AshokaHub enables entrepreneurs in Ashoka's global network to:",
		top:40*hsf, 
		left:10,
		font:{
	      fontSize:18*hsf,
	      fontFamily: hubAPI.customFont
	   },
		color:hubAPI.customTextColor
	});
	infoRow.add(missionLabel);
	infoRow.add(topicLabel);
	infoRow.add(Ti.UI.createLabel({
		text: "Find one another easily",
		top:90*hsf, 
		left:20,
		font:{
	      fontSize:17*hsf,
	      fontFamily: hubAPI.customFont
	   },
		color:hubAPI.customTextColor
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: "Contact one another easily",
		top:120*hsf, 
		left:20,
		font:{
	      fontSize:17*hsf,
	      fontFamily: hubAPI.customFont
	   },
		color:hubAPI.customTextColor
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: "Share up to date information",
		top:150*hsf, 
		left:20,
		font:{
	      fontSize:17*hsf,
	      fontFamily: hubAPI.customFont
	   },
		color:hubAPI.customTextColor
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: "Exchange knowledge, resources & opportunities",
		top:180*hsf, 
		left:20,
		font:{
	      fontSize:17*hsf,
	      fontFamily: hubAPI.customFont
	   },
		color:hubAPI.customTextColor
	}));
    
    
    
	win.addContent(infoRow);
		
	function grantEntrance(){
    	DashboardView = require('ui/common/DashboardView');
    	dashboardView = new DashboardView();
    	openWindow(dashboardView);
    };
    
    function handleFirstEvent(){
    	FirstTimeView = require('ui/common/FirstTimeView');
    	firstTimeView = new FirstTimeView();
    	openWindow(firstTimeView);
    }
    
    function openWindow(_window){
    	Ti.App.globalWindow = _window;
		Ti.App.fireEvent('openWindow',{});
    }
    function handleForgotEvent(){
    	ForgotView = require('ui/common/ForgotView');
    	forgotView = new ForgotView();
    	openWindow(forgotView);
    }
    
    function denyEntrance(){
    	username.borderColor = 'red';
		username.borderRadius = 5;
		username.borderWidth = 1;
		password.borderColor = 'red';
		password.borderRadius = 5;
		password.borderWidth = 1;
	
		errorPane.text = "Invalid email or password.";
    }
    
	Ti.App.addEventListener('handleLogin', function(event)
	{
		handleLoginEvent(event.name, event.password);
	});
    function handleLoginEvent(_username, _password){
    	AuthClient = require('services/Authentication');
    	var isAuthenticated = new AuthClient({
    		start: function() {},
    		error: function() {
    			errorPane.text = "Error:There was a problem connecting to Ashoka Hub.";},
    		failure: function() { denyEntrance()},
    		success: function(){
    			grantEntrance();
    		}
    	}, _username, _password);
    	
    }
	return win.appwin;
}	
module.exports = LoginView;