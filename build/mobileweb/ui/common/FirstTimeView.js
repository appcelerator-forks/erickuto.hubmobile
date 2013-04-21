function FirstTimeView(){
	hub = require("hub");
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	var margin_offset = 50;
	var showSuccess = function(){
		var successView = Ti.UI.createView({
			height:"auto",
			top:20*hsf,
			layout: "vertical",
		});
		win.addContent(successView);
		response_text = "Your Ashoka Hub account has been confirmed. \n\nAlmost there!\n\nWe sent you an email with a link to activate your AshokaHub account.\n\nIf you don't see it soon, please check your spam messages.\n\nIf you are having trouble logging in, let us know by emailing hub@ashoka.org"; 
		username.hide();
		loginBtn.hide();
		instructionsLabel.hide();
		successView.add(Ti.UI.createLabel({
			left:margin_offset,
			right:margin_offset,
			top:0,
			font:{
		      	fontSize:19*hsf,
		      	fontFamily: hub.API.customFont
		   	},
		   	color:hub.API.customTextColor,
			text: response_text						
		}));
		
		var returnToLogin = Ti.UI.createButton({
			title: "Return to Log in",
			top: 20,
			width: 200 * wsf, 
			height: 30,
		});
		returnToLogin.addEventListener('click', function(e){
			hub.API.closeWindow();
		});
		successView.add(returnToLogin);
	}
	var handleFirstTimeEvent = function(_email){
		if (_email === ""){
			alert("Please provide an email.");
			return;
		}		
		params = {
			"email": _email, 
		};

		Connection = require('services/Connection');
		var response = new Connection({
			start: function() {
				},
				
			error: function() {
				showError("There was a problem connecting to Ashoka Hub");
				},
			success: function(_response){
				Ti.API.info(JSON.stringify(_response.message));
				if (_response.message === "Successfully confirmed the user"){
					showSuccess();
				}
				else if (_response.message === "No Such User"){
					showError("The Email address you provided was not found.");
				}
				else if (_response.message === "User already confirmed"){
					showError("The Email address you provided was already confirmed, please try signing in.");
				}
				else{
					showError("Unknown error while confirming your account please contact hub@ashoka.org.");
				}
			}
		}, "confirmations", params, "POST", 3, {});

	};
	var errorPane = Ti.UI.createLabel({
			text:"",
			left:margin_offset,
			right:margin_offset,
			height:"auto",
			top:0,
			left:margin_offset,
			font:{
		      fontSize:15*hsf,
		      fontFamily: hub.API.customFont
		   },
		   opacity: 1,
			color:'red'
	});
	function showError(errorText){
		errorPane.text = errorText;
		instructionsLabel.hide();
		errorPane.opacity = 1; 
		username.borderColor = 'red';
		username.borderRadius = 5;
		username.borderWidth = 1;
		var timeElapsed = 0; 
		ttk = 5000;
		intervalLength = 1000; 
		function loadingAnimation(){
			 if (timeElapsed >= ttk){
			 	errorPane.opacity = 0; 
			 	username.borderColor = '#e0e0e0';
				username.borderRadius = 5;
				username.borderWidth = 1;
				instructionsLabel.show();
			 	clearInterval(loaderAnimate);
			 }
			 timeElapsed += intervalLength; 
		}
		var loaderAnimate = setInterval(loadingAnimation,intervalLength);
	
	}
	
	var appWindow = require("ui/common/CommonLoginView");
    win = new appWindow();
	win.showNavBar(); 
	var instructionsLabel = Titanium.UI.createLabel({
		left:margin_offset,
		right:margin_offset,
		height:"auto",
		top:20*hsf,
		font:{
	      fontSize:17*hsf,
	      fontFamily: hub.API.customFont
	   },
	   color:hub.API.customTextColor,
		text: 'Please enter your email address so we can verify you are on AshokaHub'
	});
	
	var username = Titanium.UI.createTextField({
		top:100*hsf,
		width:350*wsf,
		height:60*wsf,
		font:{
	      fontSize:20*hsf,
	      fontColor:hub.API.customTextColor,
	      fontFamily: hub.API.customFont
	   },
		hintText:'Enter your email address',
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
		backgroundImage:hub.API.imagePath("ashoka_login_btn.png"),
	});
	
	loginBtn.addEventListener('click',function(e){
		handleFirstTimeEvent(username.value);
		});
	
	win.addContent(errorPane);
	win.addContent(username);
	win.addContent(loginBtn);
	win.addContent(instructionsLabel);
	thisWindow = win.appwin;
	return thisWindow;
}	
module.exports = FirstTimeView;