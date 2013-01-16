var first_name = "Eric";
var last_name = "Kuto"; 
var followed_people = [];
var followed_population = [];
var followed_countries = []; 
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
		default: 
			return [];
	}
}
userFunction = function(){
	this.getCommunities = function(){
		return followed_communities;
	}
	this.getSelectedSize = function(category){
		return getArray(category).length;
	}
}; 
module.exports = userFunction; 