
var authenticateUser = function(_username, _password){
	var loginReq = Titanium.Network.createHTTPClient();
		
	loginReq.open("POST",Ti.App.getURL("api/mobile/tokens.json"));
				
	var params = {
		email: _username,
		password: _password
	};
	loginReq.send(params);
	
	loginReq.onload = function()
	{	
		var json = this.responseText;
		var response = JSON.parse(json);
		Ti.API.info(response);
		if (response.logged == 'true')
		{
			return true;
		}
		else
		{
			return false;
		}
	};
	
}
module.exports = authenticateUser;