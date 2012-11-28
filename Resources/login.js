var win = Ti.UI.createWindow({
	backgroundColor:'white', 
	layout:'vertical',
}); 

//Page Wrapper. 
var canvas = Ti.UI.createTableView({
	backgroundColor:'yellow', 
	width:'400',
	height:'97%', 
})

var logoImage = Ti.UI.createImageView({
	image:'images/ashoka_logo.png', 
	width:400
});

//logo
var logoRow = Ti.UI.createTableViewRow({
	backgroundColor:'white', 
	height: 'auto'
});

logoRow.add(logoImage);

//Form row
var formRow = Ti.UI.createTableViewRow({
	backgroundColor:'red', 
	height:'300',
});

var formView = Ti.UI.createView({
	backgroundColor:'grey',
	height:'280',
});
var username = Titanium.UI.createTextField({
	color:'#336699',
	top:10,
	width:300,
	height:70,
	hintText:'Username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var password = Titanium.UI.createTextField({
	color:'#336699',
	top:90,
	width:300,
	height:70,
	hintText:'Password',
	passwordMask:true,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var loginBtn = Titanium.UI.createButton({
	title:'Login',
	top:170,
	left:200,
	width:100,
	height:50,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

var forgotLabel = Titanium.UI.createLabel({
	left:10,
	height:50,
	top:230,
	text: 'Forgot Password?'
});

var firstLabel = Titanium.UI.createLabel({
	left:200,
	height:50,
	top:230,
	text: 'First time login'
});

formView.add(forgotLabel);
formView.add(firstLabel);
formView.add(username);
formView.add(password);
formView.add(loginBtn);
formRow.add(formView);

//Information row
var infoRow = Ti.UI.createTableViewRow({
	backgroundColor:'white', 
	height:'300',
});

var topicLabel = Ti.UI.createLabel({
	text: 'About Us',
	top:10, 
	left:10,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20, color:'blue'}
});

var topicLabel = Ti.UI.createLabel({
	text: 'About Us',
	top:10, 
	left:10,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:20},
	color:'blue'
});

var missionLabel = Ti.UI.createLabel({
	text: "AshokaHub enables entrepreneurs in Ashoka's global \nnetwork to:",
	top:40, 
	left:10,
	font:{fontFamily:'Arial',},
	color:'black'
});

infoRow.add(Ti.UI.createLabel({
	text: "Find one another easily",
	top:90, 
	left:20,
	font:{fontFamily:'Arial',},
	color:'black'
}));

infoRow.add(Ti.UI.createLabel({
	text: "Contact one another easily",
	top:120, 
	left:20,
	font:{fontFamily:'Arial',},
	color:'black'
}));

infoRow.add(Ti.UI.createLabel({
	text: "Share up to date information",
	top:150, 
	left:20,
	font:{fontFamily:'Arial',},
	color:'black'
}));

infoRow.add(Ti.UI.createLabel({
	text: "Exchange knowledge, resources & opportunities",
	top:180, 
	left:20,
	font:{fontFamily:'Arial',},
	color:'black'
}));
infoRow.add(topicLabel);
infoRow.add(missionLabel);
canvasData = [];

canvasData.push(logoRow);
canvasData.push(formRow);
canvasData.push(infoRow);
canvas.setData(canvasData);

win.add(canvas);

exports.win = win;


var loginReq = Titanium.Network.createHTTPClient();
loginReq.onload = function()
{
	alert("Got into the onload");
	var json = this.responseText;
	var response = JSON.parse(json);
	if (response.logged == true)
	{
		alert("Welcome " + response.name + ". Your email is: " + response.email);
	}
	else
	{
		alert(response.message);
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

