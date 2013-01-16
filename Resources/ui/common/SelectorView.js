function SelectorView(_category) {
	var appWindow = require("ui/common/UserView");
    win = new appWindow();
    Exploration = require("services/Exploration");
    explorer = new Exploration();
    var choices = [];
    explorer.getChoices(_category, choices); 
    var self = Ti.UI.createView();
    
    var user = Ti.App.user; 
	var communities = user.getCommunities();
	
    if (choices.length > 0){
    	MultiChoice = require("ui/common/tableViewMultiSelectRows");
    	
    	var multiChoice = new MultiChoice(choices, communities);
    	
    	self.add(multiChoice);
    }
    else {
    	var title = Ti.UI.createLabel({
			text: "Currently no options for " + _category, 
			top: 50, 
		});
		self.add(title);
    }
	
	Ti.API.info(communities.length + " communities");
	win.addContent(self);
	win.topLeftButton.addEventListener('click', function()
	{	
		Ti.App.fireEvent('updateSizes');
	});
	thisWindow = win.appwin;
	return thisWindow;
}
module.exports = SelectorView;