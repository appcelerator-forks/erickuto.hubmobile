
var customFont = 'SpicyRice-Regular';
var customBgColor = '#f9f9f9';
var customTextColor = '#5e656a';
var customTitleColor = '#0b395c';

var win = Ti.UI.createWindow({
	backgroundColor:customBgColor,
	layout:'vertical',
}); 

//Page Wrapper. 
var canvas = Ti.UI.createView({
	width:'400',
	//height:'97%'
})

var logoImage = Ti.UI.createImageView({
	image:'images/ashoka_logo.png', 
	top:25,
	width:300
});

var logoCanvas = Ti.UI.createView({top:0, height:120, width:400});
var borderBottom = Ti.UI.createView({
    backgroundColor: '#e0e0e0',
    width: 400,
    top: 140,
    height:2,
});
 
canvas.add(borderBottom);
logoCanvas.add(logoImage);
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
var username = Titanium.UI.createTextField({
	//color:customTextColor,
	top:150,
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
	top:230,
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
	top:310,
	right:50,
	width:100,
	height:50,
	borderRadius:1,
	backgroundImage:'images/ashoka_login_btn.png',
});

var forgotLabel = Titanium.UI.createLabel({
	left:50,
	height:50,
	top:370,
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
	top:370,
	color:customTextColor,
	text: 'First time login'
});

var barLabel = Titanium.UI.createLabel({
	left:210,
	height:50,
	font:{
      fontSize:20,
      fontFamily: customFont
   },
	top:370,
	color:customTextColor,
	text: '|'
});


canvas.add(forgotLabel);
canvas.add(barLabel);
canvas.add(firstLabel);
canvas.add(username);
canvas.add(password);
canvas.add(loginBtn);

//Information row
var infoRow = Ti.UI.createView({
	top:430, 
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

infoRow.add(Titanium.UI.createLabel({
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

infoRow.add(Titanium.UI.createLabel({
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

infoRow.add(topicLabel);
infoRow.add(missionLabel);
canvas.add(infoRow);



/*
canvasData = [];

canvasData.push(logoRow);
canvasData.push(formRow);
canvasData.push(infoRow);

canvas.setData(canvasData);
*/
win.add(canvas);

exports.win = win;

exports.showLoginFail = function(){
	borderBottom.top = 120;
	username.borderColor = 'red';
	username.borderRadius = 5;
	username.borderWidth = 1;
	password.borderColor = 'red';
	password.borderRadius = 5;
	password.borderWidth = 1;
	
	
	canvas.add(Ti.UI.createLabel({
		text:"Invalid email or password.",
		top:130, 
		left:50,
		font:{
	      fontSize:12,
	      fontFamily: customFont
	   },
		color:'red'
	}));

borderBottom.top = 120;

}

var loginReq = Titanium.Network.createHTTPClient();
loginReq.onload = function()
{	
	var json = this.responseText;
	var response = JSON.parse(json);
	if (response.logged == true)
	{
		username.blur();
		password.blur();
		Ti.App.fireEvent('grantEntrance', {
			name:response.name,
			email:response.email
		});
		win.close();
	}
	else
	{
		username.blur();
		password.blur();
		Ti.App.fireEvent('denyEntrance');
	}
};
loginBtn.addEventListener('click',function(e)
{

	if (username.value != '' && password.value != '')
	{
		loginReq.open("POST","http://50.17.229.217/ashokahub/authenticate.php");
			
		var params = {
			username: username.value,
			password: password.value
		};
		loginReq.send(params);
	}
	else
	{
		alert("Username/Password are required");
	}
});


