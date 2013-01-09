function LoginView(){
	
	var utilities = require("common/utilities");
	var util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	var margin_offset = (util.app_width-350*wsf)/2;
	
	var appWindow = require("ui/common/CommonLoginView");
    win = new appWindow();


	var username = Titanium.UI.createTextField({
		top:20*hsf,
		width:350*wsf,
		height:60*wsf,
		font:{
	      fontSize:20*hsf,
	      fontColor:util.customTextColor,
	      fontFamily: util.customFont
	   },
		hintText:'Enter your email address',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
		borderColor:'#e0e0e0',
		borderRadius:5,
		borderWidth:1,
	});
	
	var password = Titanium.UI.createTextField({
		color:util.customTextColor,
		top:100*hsf,
		width:350*wsf,
		height:60*wsf,
		font:{
	      fontSize:20*hsf,
	      fontFamily: util.customFont
	   },
		hintText:'Enter your Password',
		passwordMask:true,
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
		backgroundImage:'images/ashoka_login_btn.png',
	});
	
	loginBtn.addEventListener('click',function(e){
		handleLoginEvent("username.value","password.value");
		});
		
	var forgotLabel = Titanium.UI.createLabel({
		left:margin_offset,
		height:50*hsf,
		top:240*hsf,
		font:{
	      fontSize:17*hsf,
	      fontFamily: util.customFont
	   },
	   color:util.customTextColor,
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
	      fontFamily: util.customFont
	   },
		top:240*hsf,
		color:util.customTextColor,
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
	      fontFamily: util.customFont
	   },
		top:240*hsf,
		color:util.customTextColor,
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
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20*hsf, color:util.customTitleColor}
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:117*hsf,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20*hsf, color:util.customTitleColor}
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:147*hsf,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20*hsf, color:util.customTitleColor}
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:177*hsf,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20*hsf, color:util.customTitleColor}
	}));
	topicLabel = Ti.UI.createLabel({
		text: 'About Us',
		top:10*hsf, 
		left:10,
		font:{
	      fontSize:21*hsf,
	      fontWeight:'bold',
	      fontColor:util.customTitleColor,
	      fontFamily: util.customFont
	   },
		color:util.customTitleColor
	});
	
	var missionLabel = Ti.UI.createLabel({
		text: "AshokaHub enables entrepreneurs in Ashoka's global network to:",
		top:40*hsf, 
		left:10,
		font:{
	      fontSize:18*hsf,
	      fontFamily: util.customFont
	   },
		color:util.customTextColor
	});
	infoRow.add(missionLabel);
	infoRow.add(topicLabel);
	infoRow.add(Ti.UI.createLabel({
		text: "Find one another easily",
		top:90*hsf, 
		left:20,
		font:{
	      fontSize:17*hsf,
	      fontFamily: util.customFont
	   },
		color:util.customTextColor
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: "Contact one another easily",
		top:120*hsf, 
		left:20,
		font:{
	      fontSize:17*hsf,
	      fontFamily: util.customFont
	   },
		color:util.customTextColor
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: "Share up to date information",
		top:150*hsf, 
		left:20,
		font:{
	      fontSize:17*hsf,
	      fontFamily: util.customFont
	   },
		color:util.customTextColor
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: "Exchange knowledge, resources & opportunities",
		top:180*hsf, 
		left:20,
		font:{
	      fontSize:17*hsf,
	      fontFamily: util.customFont
	   },
		color:util.customTextColor
	}));
    
    
    
	win.addContent(infoRow);
	
	function showLoginFail(){
		username.borderColor = 'red';
		username.borderRadius = 5;
		username.borderWidth = 1;
		password.borderColor = 'red';
		password.borderRadius = 5;
		password.borderWidth = 1;
	
		win.addContent(
			Ti.UI.createLabel({
				text:"Invalid email or password.",
				top:2, 
				left:margin_offset,
				font:{
			      fontSize:12*hsf,
			      fontFamily: util.customFont
			   },
				color:'red'
			})
			);
		};
		
	function grantEntrance(name, email){
    	/*var dashBoardView = require("common/views/DashBoardView");
    	user = {};
    	user.name = name;
    	user.email = email;
    	dbView = new dashBoardView(user);
    	liView.close();
    	//Ti.UI.currentWindow.close();
    	dbView.open();
    	*/
    	var newWindow = Ti.UI.createWindow({
			title:'You are now logged in',
			backgroundColor: 'Green',
			layout:'vertical',
		}); 
    	Ti.App.fireEvent('openWindow',{
    		_win:newWindow
    	});
    };
    
    function handleFirstEvent(){
    	FirstTimeView = require('ui/common/FirstTimeView');
    	var firstTimeView = new FirstTimeView();
    	Ti.App.fireEvent('openWindow',{
    		_win:firstTimeView
    	});
    }
    
    function handleForgotEvent(){
    	var newWindow = Ti.UI.createWindow({
			title:'Forgot password?',
			backgroundColor: 'Orange',
			layout:'vertical',
		}); 
    	Ti.App.fireEvent('openWindow',{
    		_win:newWindow
    	});
    }
    
    function denyEntrance(){
    	showLoginFail();
    }
    

    function handleLoginEvent(_username, _password){
    	/*var loginReq = Titanium.Network.createHTTPClient();
		
		loginReq.open("POST","http://50.17.229.217/ashokahub/authenticate.php");
					
		var params = {
			username: _username,
			password: _password
		};
		loginReq.send(params);
		
		loginReq.onload = function()
		{	
			var json = this.responseText;
			var response = JSON.parse(json);
			if (response.logged == true)
			{
				grantEntrance(response.name,response.email);
			}
			else
			{
				denyEntrance();
			}
		};
		*/
		//denyEntrance();
		grantEntrance(_username, _password);
    }
	
	return win.appwin;
}	
module.exports = LoginView;