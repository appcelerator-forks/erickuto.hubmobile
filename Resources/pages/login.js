var win = Ti.UI.createWindow({
	backgroundColor:'white', 
	layout:'vertical',
	whichObj:'window'
}); 

//Page Wrapper. 
var yellowView = Ti.UI.createView({
	backgroundColor:'yellow', 
	left:10,
	width:'99%',
	height:'99%', 
	whichObj:'view'
	
})

//Logo

var header = Ti.UI.createView({
	top:10,
	height:'auto',
	borderWidth:1,
	borderColor:'#999',
	backgroundColor:'white'
	});
	
var frontPageLogo = Ti.UI.createImageView({ 
	top:10,
	height:'auto', 
	text:'Header', 
	image:'images/ashoka_logo.png' /* accepts URL, local path, or Ti.Filesystem.File */
});
	
header.add(frontPageLogo);

yellowView.add(header);
	
var username = Titanium.UI.createTextField({
	color:'#336699',
	top:110,
	width:300,
	//height:40,
	hintText:'Username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var password = Titanium.UI.createTextField({
	color:'#336699',
	top:210,
	width:300,
	//height:40,
	hintText:'Password',
	passwordMask:true,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var loginBtn = Titanium.UI.createButton({
	title:'Login',
	top:310,
	width:100,
	//height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

yellowView.add(username);
yellowView.add(password);
yellowView.add(loginBtn);

win.add(yellowView);
exports.myView = yellowView;
exports.win = win;

/*
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
*/
