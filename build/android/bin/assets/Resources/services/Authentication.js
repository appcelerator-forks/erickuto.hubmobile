hub = require("hub");

authenticateUser = function(o, _username, _password){
	var tries = 3; 	
	var params = {
		email: _username,
		password: _password
	};
	
	Connection = require('services/Connection');
	var response = new Connection({
		start: function() {
			if (o.start) { o.start(); }
			},
			
		error: function() {
			if (o.error) { o.error(); }
			},
		success: function(_response){
			if (_response.logged === 'true')
				{
					if (o.success){
						//Add Authentication token to user. 
						hub.API.user.setAuthToken(_response.token);
						o.success();
						}
				}
				else{
					if (o.failure){o.failure()}
				}
			}
	}, "mobile/tokens", params, "POST", tries);
}
module.exports = authenticateUser;