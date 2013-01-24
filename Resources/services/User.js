var first_name = "Eric";
var last_name = "Kuto"; 
var followed_people = [];
var followed_population = [];
var followed_countries = [1,3]; 
var followed_groups = [];
var followed_communities = [1,2,3];
var followed_fields = [];
var followed_free_tags = [];

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
		case "countries":
			return followed_countries;
		default: 
			return [];
	}
}
userFunction = function(){
	this.getSelectedOptions = function(category){
		return getArray(category)
	}
	this.getSelectedSize = function(category){
		return getArray(category).length;
	}
}; 
module.exports = userFunction; 