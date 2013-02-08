var category = null; 
var params = null;
var isReady = false; 
var results = [];

Ti.App.addEventListener("Results", function(){
	var resultsClient = new ResultsClient({
		
		start: function() { Ti.API.info("Fetching results for " + category); },
		error: function() { Ti.API.info("ERROR!! while getting results for " + category);},
	
		success: function(_json){
			_results = _json.results; 
			for (i = 0; i < _results.length; i++){
				results.push(_results[i]);
			}
	
			isReady = true; 
			Ti.API.info("Found the counts showing page now.. ");
			if (category === "activities/count"){
				Ti.App.fireEvent('showSearchPage');
			}
			 
		}
	}, category, params);
});

function SearchResults(_category, _params){
	ResultsClient = require('services/Results');
	
	category = _category; 
	params = _params; 
	
	this.getResults = function(_results){
			for (i = 0; i < results.length; i++){
				_results.push(results[i]);
			}
	};
	this.isReady = function(){
		return isReady; 
	}
}

module.exports = SearchResults; 

