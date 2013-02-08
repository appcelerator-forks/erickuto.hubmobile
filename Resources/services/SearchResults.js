var category = null; 
var params = null;
var isReady = false; 
var results = [];
var counts = {}; 

ResultsClient = require('services/Results'); 

Ti.App.addEventListener("Results", function(){
	var resultsClient = new ResultsClient({
		
		start: function() { Ti.API.info("Fetching results for " + category); },
		error: function() { Ti.API.info("ERROR!! while getting results for " + category);},
		success: function(_json){
			results = []; 
			if (category === "activities/count"){
				counts = _json;
				Ti.App.fireEvent('showSearchPage');
			}
			else{
				_results = _json.results; 
				for (i = 0; i < _results.length; i++){
					results.push(_results[i]);
				}
				Ti.App.fireEvent('showFetchResults');
			}
			isReady = true; 
			 
		}
	}, category, params);
});

function SearchResults(_category, _params){
	
	category = _category; 
	params = _params; 
	
	this.getResults = function(_results){
			for (i = 0; i < results.length; i++){
				_results.push(results[i]);
			}
	};
	this.getCounts = function(_category){
		return counts[_category]; 
	};
	this.isReady = function(){
		return isReady; 
	}
	this.changeReadyState = function(state){
		isReady = state; 
	}
}

module.exports = SearchResults; 

