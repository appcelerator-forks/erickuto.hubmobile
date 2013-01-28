
TagClient = require('services/Tags');
var communities = [];
var targetPopulations = []; 
var regions = [];
var fieldsOfWork = []; 
var people = []; 
var groups = []; 

var tagClient = new TagClient({
	start: function() {Ti.API.info("Fetching tags..")},
	error: function() {Ti.API.info("Error:There was a problem connecting to Ashoka Hub.");},

	success: function(_tags){
		for (i = 0; i < _tags.communities.length; i++){
			communities.push(_tags.communities[i].title);
			groups.push(_tags.communities[i].groups);
		}
		for (i = 0; i < _tags.targetPopulations.length; i++){
			targetPopulations.push(_tags.targetPopulations[i]);
		}
		for (i = 0; i < _tags.regions.length; i++){
			region = _tags.regions[i];
			countries = [];
			for (j = 0; j < region.countries.length; j++){
				country = region.countries[j];
				subLocations = country.subLocations;
				countryObject = {"name": country.title, "subLocations": subLocations}
				countries.push(countryObject);
			}
			regionObject = {"name": region.title, "countries": countries};
			regions.push(regionObject);
		}
		for (i = 0; i < _tags.fieldsOfWork.length; i++){
			fieldsOfWork.push(_tags.fieldsOfWork[i]);
		}
		for (i = 0; i < _tags.userTypes.length; i++){
			people.push(_tags.userTypes[i]);
		}
	}
});

function getCommunities(choices){
	for (i = 0; i < communities.length; i++){
		choices.push(communities[i]);
	}
}

function getTargetPopulations(choices){
	for (i = 0; i < targetPopulations.length; i++){
		choices.push(targetPopulations[i]);
	}
}

function getRegions(choices){
	for (i = 0; i < regions.length; i++){
		choices.push(regions[i].name);
	}
}

function getCountries(choices){
	userRegions = hubAPI.user.getSelectedOptions("regions");
	for (i = 0; i < userRegions.length; i++){
		index = userRegions[i]; 
		for (j = 0; j < regions[index].countries.length; j++){
			choices.push(regions[index].countries[j].name);
		}
	}
}

function getCities(choices){
	userRegions = hubAPI.user.getSelectedOptions("regions");
	userCountries = hubAPI.user.getSelectedOptions("countries");
	for (i = 0; i < userRegions.length; i++){
		indexRegion = userRegions[i]; 
		for (j = 0; j < userCountries.length; j++){
			indexCountry = userCountries[j]; 
			subLocations = regions[indexRegion].countries[indexCountry].subLocations; 
			for (k = 0; k < subLocations.length; k++){
				choices.push(subLocations[i]);
			}
		}
	}
}
function getFieldsOfWork(choices){
	for (i = 0; i < fieldsOfWork.length; i++){
		choices.push(fieldsOfWork[i]);
	}
}

function getGroups(choices){
	userCommunities = hubAPI.user.getSelectedOptions("communities");
	for (i = 0; i < userCommunities.length; i++){
		index = userCommunities[i];
		for (j = 0; j < groups[index].length; j++){
			choices.push(groups[index][j]);
		}
	}
}

function getPeople(choices){
	for (i = 0; i < people.length; i++){
		choices.push(people[i]);
	}
}

function Exploration(){
	
	this.getChoices = function(_category, choices){
		if (_category == "communities"){
			return getCommunities(choices);
		}
		else if (_category == "target"){
			return getTargetPopulations(choices);
		}
		else if (_category == "fields"){
			return getFieldsOfWork(choices);
		}
		else if (_category == "regions"){
			return getRegions(choices);
		}
		else if (_category == "countries"){
			return getCountries(choices);
		}
		else if (_category == "people"){
			return getPeople(choices);
		}
		else if (_category == "groups"){
			return getGroups(choices);	
		}
		else if (_category == "cities"){
			return getCities(choices);	
		}
		else{
			choices = [];
		}
	};

}

module.exports = Exploration; 

