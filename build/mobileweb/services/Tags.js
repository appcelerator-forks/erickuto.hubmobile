
fetchTags = function(o){
	var tries = 3; 	

	
	Connection = require('services/Connection');
		getParams = [];
		getParams.push({
			"key0":"auth_token", 
			"value0":hubAPI.user.getAuthToken()
			});

    	var response = new Connection({
    		start: function() {
    			if (o.start) { o.start(); }
    			},
    			
    		error: function() {
    			if (o.error) { o.error(); }
    			},
    		
    		success: function(_response){
    			if (_response.fetched === 'true')
					{
						if (o.success){o.success(_response);}
					}
					else{
						if (o.failure){o.failure()}
					}
    			}
    	}, "mobile/tags", [], "GET", tries, getParams);
	
}
module.exports = fetchTags;