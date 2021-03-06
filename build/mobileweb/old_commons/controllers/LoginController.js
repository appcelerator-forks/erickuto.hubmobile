
function LoginController(){

	var loginView = require("common/views/LoginView");
    liView = new loginView();
    liView.setEventListeners();
    liView.open();
    
	
    function grantEntrance(name, email){
    	var dashBoardView = require("common/views/DashBoardView");
    	user = {};
    	user.name = name;
    	user.email = email;
    	dbView = new dashBoardView(user);
    	liView.close();
    	//Ti.UI.currentWindow.close();
    	dbView.open();
    	
    };
    
    function denyEntrance(){
    	liView.showLoginFail();
    }
    
   
   	Ti.App.addEventListener('handleLogin', function(event)
	{
		handleLoginEvent(event.name, event.password);
	});
    function handleLoginEvent(_username, _password){
    	var loginReq = Titanium.Network.createHTTPClient();
		
		loginReq.open("POST","http://greenhub-staging.herokuapp.com/api/mobile/tokens.json");
					
		var params = {
			email: _username,
			password: _password
		};
		Ti.API.info(params);
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
		
    }

}

//public exports
module.exports = LoginController;