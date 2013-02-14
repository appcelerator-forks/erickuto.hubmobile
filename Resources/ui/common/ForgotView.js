function FirstTimeView(){
	
	var utilities = require("ui/common/utilities");
	var util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	var margin_offset = (util.app_width-350*wsf)/2;
	
	var appWindow = require("ui/common/CommonLoginView");
    win = new appWindow();
	win.showNavBar(); 
	var email = Titanium.UI.createTextField({
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
	
	
	var recoverBtn = Titanium.UI.createButton({
		top:190*hsf,
		right:margin_offset,
		width:180*wsf,
		height:40*hsf,
		borderRadius:1,
		backgroundImage:util.imagePath("recover_password_btn.png"),
	});
	
	recoverBtn.addEventListener('click',function(e){
		handleForgotEvent();
		});
		
	win.addContent(email);
	win.addContent(recoverBtn);
	thisWindow = win.appwin;

	return thisWindow;
}	
module.exports = FirstTimeView;