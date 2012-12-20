/*
 * Login UI
 */
function LoginView(){
	
	var customFont = 'SpicyRice-Regular';
	var customBgColor = '#f9f9f9';
	var customTextColor = '#5e656a';
	var customTitleColor = '#0b395c';
	
    var appWindow = require("common/mweb/ApplicationView");
    win = new appWindow();
    
    var username = Titanium.UI.createTextField({
		top:20,
		width:300,
		height:70,
		font:{
	      fontSize:23,
	      fontColor:customTextColor,
	      fontFamily: customFont
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
		color:customTextColor,
		top:100,
		width:300,
		height:70,
		font:{
	      fontSize:23,
	      fontFamily: customFont
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
		top:180,
		right:50,
		width:100,
		height:50,
		borderRadius:1,
		backgroundImage:'images/ashoka_login_btn.png',
	});
	
	var forgotLabel = Titanium.UI.createLabel({
		left:50,
		height:50,
		top:240,
		font:{
	      fontSize:17,
	      fontFamily: customFont
	   },
	   color:customTextColor,
		text: 'Forgot Password?'
	});
	
	var firstLabel = Titanium.UI.createLabel({
		right:50,
		height:50,
		font:{
	      fontSize:17,
	      fontFamily: customFont
	   },
		top:240,
		color:customTextColor,
		text: 'First time login'
	});
	
	var barLabel = Titanium.UI.createLabel({
		left:260,
		height:50,
		font:{
	      fontSize:20,
	      fontFamily: customFont
	   },
		top:240,
		color:customTextColor,
		text: '|'
	});
	
	
	win.addContent(username);
	win.addContent(barLabel);
	win.addContent(firstLabel);
	win.addContent(username);
	win.addContent(password);
	win.addContent(loginBtn);
	
	//Information row
	var infoRow = Ti.UI.createView({
		top:290, 
		height:'300',
	});
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:87,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20, color:customTitleColor}
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:117,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20, color:customTitleColor}
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:147,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20, color:customTitleColor}
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: '\u2022',
		top:177,
		left:10,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20, color:customTitleColor}
	}));
	topicLabel = Ti.UI.createLabel({
		text: 'About Us',
		top:10, 
		left:10,
		font:{
	      fontSize:21,
	      fontWeight:'bold',
	      fontColor:customTitleColor,
	      fontFamily: customFont
	   },
		color:customTitleColor
	});
	
	var missionLabel = Ti.UI.createLabel({
		text: "AshokaHub enables entrepreneurs in Ashoka's global network to:",
		top:40, 
		left:10,
		font:{
	      fontSize:18,
	      fontFamily: customFont
	   },
		color:customTextColor
	});
	infoRow.add(missionLabel);
	infoRow.add(topicLabel);
	infoRow.add(Ti.UI.createLabel({
		text: "Find one another easily",
		top:90, 
		left:20,
		font:{
	      fontSize:17,
	      fontFamily: customFont
	   },
		color:customTextColor
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: "Contact one another easily",
		top:120, 
		left:20,
		font:{
	      fontSize:17,
	      fontFamily: customFont
	   },
		color:customTextColor
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: "Share up to date information",
		top:150, 
		left:20,
		font:{
	      fontSize:17,
	      fontFamily: customFont
	   },
		color:customTextColor
	}));
	
	infoRow.add(Ti.UI.createLabel({
		text: "Exchange knowledge, resources & opportunities",
		top:180, 
		left:20,
		font:{
	      fontSize:17,
	      fontFamily: customFont
	   },
		color:customTextColor
	}));
    
    
    
	win.addContent(infoRow);

	this.open = function(){
		win.open();
	}
	this.showLoginFail = function(win){
		win.username.borderColor = 'red';
		win.username.borderRadius = 5;
		win.username.borderWidth = 1;
		win.password.borderColor = 'red';
		win.password.borderRadius = 5;
		win.password.borderWidth = 1;
	
		HUB.ui.ApplicationView.addContent(
			Ti.UI.createLabel({
				text:"Invalid email or password.",
				top:2, 
				left:50,
				font:{
			      fontSize:12,
			      fontFamily: customFont
			   },
				color:'red'
			}), win);
		};
		
	this.setEventListeners = function(){	
		
        w.loginBtn.addEventListener('click',function(e)
		{
			if (w.username.value != '' && w.password.value != '')
			{
				handleLoginEvent(w);
			}
			else
			{
				alert("Username/Password are required");
			}
		});
   };
}

//Publically accessible methods
module.exports = LoginView;
