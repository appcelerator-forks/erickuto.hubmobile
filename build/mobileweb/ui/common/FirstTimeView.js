function FirstTimeView(){
	
	var utilities = require("ui/common/utilities");
	var util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	var margin_offset = (util.app_width-350*wsf)/2;
	
	var appWindow = require("ui/common/CommonLoginView");
    win = new appWindow();


	var instructionsLabel = Titanium.UI.createLabel({
		left:margin_offset,
		height:50*hsf,
		top:20*hsf,
		font:{
	      fontSize:17*hsf,
	      fontFamily: util.customFont
	   },
	   color:util.customTextColor,
		text: 'Please enter your email address so we can verify you are on AshokaHub'
	});
	
	var username = Titanium.UI.createTextField({
		top:100*hsf,
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
	
	
	var loginBtn = Titanium.UI.createButton({
		top:180*hsf,
		right:margin_offset,
		width:100*wsf,
		height:50*hsf,
		borderRadius:1,
		backgroundImage:util.imagePath("ashoka_login_btn.png"),
	});
	
	loginBtn.addEventListener('click',function(e){
		handleLoginEvent("username.value","password.value");
		});
		
	win.addContent(username);
	win.addContent(loginBtn);
	win.addContent(instructionsLabel);
	thisWindow = win.appwin;
	Ti.API.info("Like a v");
	return thisWindow;
}	
module.exports = FirstTimeView;