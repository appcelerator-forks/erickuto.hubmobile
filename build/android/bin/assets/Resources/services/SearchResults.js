var category = null; 
var params = null;
var isReady = false; 
var results = [];
var counts = {}; 
var hasMore = false; 
var page = 0; 
ResultsClient = require('services/Results'); 

Ti.App.addEventListener("Results", function(){
	var resultsClient = new ResultsClient({
		
		start: function() { },
		error: function() { Ti.API.info("ERROR!! while getting results for " + category);},
		success: function(_json){
			page = _json.page;
			
			if (page == 0){
				results = []; 
			}
			if (_json.hasMore == true){
				hasMore = true; 
			}
			else{
				hasMore = false; 
			}
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
	this.getNeon = function(index){
		return results[index]; 
	}
	this.getCounts = function(_category){
		return counts[_category]; 
	};
	this.isReady = function(){
		return isReady; 
	}
	this.hasMore = function(){
		return hasMore; 
	}
	this.getPage = function(){
		return page; 
	}
	this.changeReadyState = function(state){
		isReady = state; 
	}
}

module.exports = SearchResults; 
