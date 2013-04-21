
var results = [];
var counts = {}; 
var hasMore = false; 
var page = 0; 

function SearchResults(_category, _params, o){
	
	Connection = require('services/Connection');

	var response = new Connection({
		start: function() {
			if (o.start) { o.start(); }
			},
			
		error: function() {
			if (o.error) { o.error(); }
			},
		
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
				if (_category === "activities/count"){
					counts = _json; 
				}
				else{
					_results = _json.results; 
					for (i = 0; i < _results.length; i++){
						results.push(_results[i]);
					}
				}

				o.success();
			}
	}, _category , [], "GET", _params);
	
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

