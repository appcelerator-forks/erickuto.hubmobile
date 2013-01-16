
function getCommunities(choices){
	var communities = ["AshokaHub", 
		"Rural Innovation and Farming", 
		"Technology and Investment", 
		"Full Information Citizenship", 
		"Social Justice"
	]; 
	for (i = 0; i < communities.length; i++){
		choices.push(communities[i]);
	}
}
function Exploration(){
	
	this.getChoices = function(_category, choices){
		if (_category == "communities"){
			return getCommunities(choices);
		}
		else{
			choices = [];
		}
	};

}

module.exports = Exploration; 

