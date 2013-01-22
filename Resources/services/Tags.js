
fetchTags = function(o){
	var tries = 3; 	

	
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
    			if (_response.fetched === 'true')
					{
						if (o.success){o.success(_response);}
					}
					else{
						if (o.failure){o.failure()}
					}
    			}
    	}, "tags",[], "GET", tries);
	
}
module.exports = fetchTags;