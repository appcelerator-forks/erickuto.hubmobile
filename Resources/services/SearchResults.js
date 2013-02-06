
function SearchResults(category, params){
	ResultsClient = require('services/Results');
	var results = [];
	isReady = false; 
	
	var resultsClient = new ResultsClient({
		
		start: function() { Ti.API.info("Fetching results for " + category); },
		error: function() { Ti.API.info("ERROR!! while getting results for " + category);},
	
		success: function(_json){
			_results = _json.results; 
			for (i = 0; i < _results.length; i++){
				results.push(_results[i]);
			}
	
			isReady = true; 
			Ti.App.fireEvent('showFetchResults'); 
		}
	}, category, params);
	
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

