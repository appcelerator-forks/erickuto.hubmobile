
authenticateUser = function(o, _username, _password){
	var tries = 3; 	
	var params = {
		email: _username,
		password: _password
	};
	
	Connection = require('services/Connection');
    	var response = new Connection({
    		start: function() {
    			Ti.API.info("Connecting.."); 
    			if (o.start) { o.start(); }
    			},
    			
    		error: function() {
    			if (o.error) { o.error(); }
    			},
    		
    		success: function(_response){
    			if (_response.logged === 'true')
					{
						if (o.success){o.success(_response.token);}
					}
					else{
						if (o.failure){o.failure()}
					}
    			}
    	}, "tokens", params, "POST", tries);
	
}
module.exports = authenticateUser;