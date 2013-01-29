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
	this.getSelectedSize = function(category){
		return getArray(category).length;
	}
}; 
module.exports = userFunction; 