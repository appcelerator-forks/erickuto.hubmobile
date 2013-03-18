
fetchTags = function(o, _category, params){
	tries = 3
	
	Connection = require('services/Connection');

    	var response = new Connection({
    		start: function() {
    			if (o.start) { o.start(); }
    			},
    			
    		error: function() {
    			if (o.error) { o.error(); }
    			},
    		
    		success: function(_response){
				if (o.success){
					o.success(_response);}
    			}
    	}, _category , [], "GET", tries, params);
}
module.exports = fetchTags;