function NewMessageView (_messageClass){
	hub = require("hub");
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	var margin_offset = (hub.API.app_width-350*wsf)/2;
	
	var buildNewMessageView = function(){
		var self = Ti.UI.createView({
			top: 10, 
			backgroundColor:hub.API.customBgColor,
			layout: 'vertical', 
		});
		
		self.add(Ti.UI.createLabel({
			top: 10,
			text: "To", 
			left: 5,
			color: hub.API.util.customTextColor,
			font:{
		      fontSize:30*hsf,
		      fontColor:hub.API.util.customTextColor,
		      fontFamily: hub.API.util.customFont
		   },
		}));
		
		var names = Titanium.UI.createTextField({
			width:"97%",
			height:80*hsf,
			font:{
		      fontSize:30*hsf,
		      fontColor:hub.API.util.customTextColor,
		      fontFamily: hub.API.util.customFont
		   },
			hintText:'Enter name(s) here...',
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:5,
			borderWidth:1,
		});
		self.add(names);
		self.add(Ti.UI.createLabel({
			top: 10,
			text: "Subject", 
			left: 5,
			color: hub.API.util.customTextColor,
			font:{
		      fontSize:30*hsf,
		      fontColor:hub.API.util.customTextColor,
		      fontFamily: hub.API.util.customFont
		   },
		}));
		
		var subject = Titanium.UI.createTextField({
			color:hub.API.util.customTextColor,
			width:"97%",
			height:80*hsf,
			font:{
		      fontSize:20*hsf,
		      fontFamily: hub.API.util.customFont
		   },
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:5,
			borderWidth:1,
		});
		self.add(subject);
		self.add(Ti.UI.createLabel({
			top: 10,
			text: "Message", 
			left: 5,
			color: hub.API.util.customTextColor,
			font:{
		      fontSize:30*hsf,
		      fontColor:hub.API.util.customTextColor,
		      fontFamily: hub.API.util.customFont
		   },
		}));
		var messageDetails = Ti.UI.createTextArea({
		  borderWidth: 2,
		  borderColor: '#bbb',
		  borderRadius: 5,
		  color: '#888',
		  font: {fontSize:15},
		  textAlign: 'left',
		  hintText:'I am a textarea',
		  top: 0,  left: 5,
		  width:"97%", height : 150*hsf,
		});
		
		self.add(messageDetails);
		
		var replyButton = Ti.UI.createImageView({
			image: hub.API.imagePath('send.png'),
			width: 85, 
			top: 10,
			right: 5,
		});
		
		self.add(replyButton); 
		
		return self; 
	}
	
	var appWindow = require("ui/common/UserView");
    newmessage_win = new appWindow("Inbox");
	self = buildNewMessageView(); 
	newmessage_win.addContent(self);

	thisWindow = newmessage_win.appwin;
	return thisWindow;
	
}
	
module.exports = NewMessageView;