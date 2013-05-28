hub = require("hub");
var first_name = "Eric";
var last_name = "Kuto"; 
var followed_people = [];
var followed_population = [];
var followed_regions = []; 
var followed_groups = [];
var followed_communities = [];
var followed_countries = []; 
var followed_fields = [];
var followed_free_tags = [];
var followed_cities = []; 
var authToken = null; 
var filter_criterion = ""; 
var filter_query = ""; 
var filter_content = ""; 

function getArray(category){
	switch (category){
		case "people":
			return followed_people;
		case "communities":
			return followed_communities;
		case "target":
			return followed_population;
		case "groups":
			return followed_groups;
		case "fields":
			return followed_fields;
		case "free":
			return followed_free_tags;
		case "regions":
			return followed_regions;
		case "countries":
			return followed_countries;
		case "cities":
			return followed_cities;
		default: 
			return [];
	}
}

userFunction = function(){
	this.getSelectedOptions = function(category){
		return getArray(category);
	}
	this.getAll = function(_allFollowed){
		var data = ["people","communities","groups","regions","countries","cities","fields","target","free"];
		
		var resultIndex = 0; 
		for (var k = 0; k < data.length; k++){
			
			thisArray = getArray(data[k]);

			if (thisArray.length > 0){
				var options = [];
				hub.API.explorer.getChoices(data[k], options); 
				for (var j = 0; j < thisArray.length; j++){
					var resultArray = {}
					keyText = "key"+resultIndex;
					valueText = "value"+resultIndex;
					
					
					if (data[k] === "free"){
						resultArray[keyText] = "tags"
						resultArray[valueText] = thisArray[j];
					}
					else if (data[k] === "people"){
						resultArray[keyText] = "user_types"
						resultArray[valueText] = options[thisArray[j]]; 
					}
					else{
						if(data[k] === "countries"){
							resultArray[keyText] = "locations_of_work"; 
						}
						else if(data[k] === "cities"){
							resultArray[keyText] = "locations"; 
						}
						else if(data[k] === "fields"){
							resultArray[keyText] = "fields_of_work"; 
						}
						else{
							resultArray[keyText] = data[k]; 
						}
						
						resultArray[valueText] = options[thisArray[j]]; 
					}
					_allFollowed.push(resultArray);
					resultIndex++; 
				}
			}
		}
	}
	this.clearGroupOptions = function(){
		followed_groups = [];
	}
	this.clearCountriesOptions = function(){
		followed_countries = []; 
	}
	this.clearSubLocationsOptions = function(){
		followed_cities = []; 
	}
	this.setAuthToken = function(_authToken){
		authToken = _authToken; 
	}
	this.getAuthToken = function(){
		return authToken;
	}
	this.getFilterCriterion = function(){
		return filter_criterion; 
	}
	this.setFilterCriterion = function(_criterion){
		filter_criterion = _criterion; 
	}
	this.getFilterContent = function(){
		return filter_content; 
	}
	this.setFilterContent = function(_content){
		filter_content = _content; 
	}
	this.getSelectedSize = function(category){
		return getArray(category).length;
	}
	this.getFilterQuery = function(){
		return filter_query.replace(" ", "+"); 
	}
	this.setFilterQuery = function(_query){
		filter_query = _query; 
	}
}; 
module.exports = userFunction; 