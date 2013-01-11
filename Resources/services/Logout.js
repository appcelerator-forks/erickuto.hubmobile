
logoutUser = function(o, _username, _password, tries){
	var loginReq = Titanium.Network.createHTTPClient();
	var url = Ti.App.getRemoteURL("api/mobile/tokens.json");
	Ti.API.info("url is: " + url);
	tries = tries || 0; 			
	var params = {
		email: _username,
		password: _password
	};
	Ti.API.info(" user " + _username + " password " + _password);
	
	loginReq.open("POST",url);
	loginReq.onload = function(e)
	{	
		var json = this.responseText;
		
		if (loginReq === null || json === null){
			if (tries < 3){
				tries++;
				Ti.API.info("trying .. " + tries);
				authenticateUser(o, _username, _password, tries);
				return;
			}
			else{
				alert('Error connecting to internet. Please make sure you have a connection and try restarting Hub');
				if (o.error){ o.error();}
				return;
			}
		}
		
		var response = JSON.parse(json);
		Ti.API.info(response);
	
		if (response.logged === 'true')
		{
			if (o.success){o.success(response.token);}
		}
		else{
			if (o.failure){o.failure()}
		}
		
	};
	
	loginReq.onerror = function(e){
		if (o.error) {o.error();}
	};
	
	if (o.start) { o.start(); }
	loginReq.send(params);
	
}
module.exports = logoutUser;