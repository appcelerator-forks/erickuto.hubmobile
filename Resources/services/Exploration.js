
TagClient = require('services/Tags');
var communities = [];
var targetPopulations = []; 
var locationsOfWork = []; 
var fieldsOfWork = []; 

var tagClient = new TagClient({
	start: function() {Ti.API.info("Fetching tags..")},
	error: function() {Ti.API.info("Error:There was a problem connecting to Ashoka Hub.");},

	success: function(_tags){
		Ti.API.info("Got Some Tags!!" + _tags.communities.length);
		for (i = 0; i < _tags.communities.length; i++){
			communities.push(_tags.communities[i]);
		}
		for (i = 0; i < _tags.targetPopulations.length; i++){
			targetPopulations.push(_tags.targetPopulations[i]);
		}
		for (i = 0; i < _tags.locationsOfWork.length; i++){
			locationsOfWork.push(_tags.locationsOfWork[i]);
		}
		for (i = 0; i < _tags.fieldsOfWork.length; i++){
			fieldsOfWork.push(_tags.fieldsOfWork[i]);
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

function getLocationsOfWork(choices){
	for (i = 0; i < locationsOfWork.length; i++){
		choices.push(locationsOfWork[i]);
	}
}

function getFieldsOfWork(choices){
	for (i = 0; i < fieldsOfWork.length; i++){
		choices.push(fieldsOfWork[i]);
	}
}

function Exploration(){
	
	this.getChoices = function(_category, choices){
		if (_category == "communities"){
			return getCommunities(choices);
		}
		if (_category == "target"){
			return getTargetPopulations(choices);
		}
		if (_category == "countries"){
			return getLocationsOfWork(choices);
		}
		if (_category == "fields"){
			return getFieldsOfWork(choices);
		}
		else{
			choices = [];
		}
	};

}

module.exports = Exploration; 

