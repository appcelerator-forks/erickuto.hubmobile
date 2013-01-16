function SelectorView(_category) {
	var appWindow = require("ui/common/UserView");
    win = new appWindow();
    Exploration = require("services/Exploration");
    explorer = new Exploration();
    var choices = [];
    explorer.getChoices(_category, choices); 
    var self = Ti.UI.createView();
    if (choices.length > 0){
    	MultiChoice = require("ui/common/tableViewMultiSelectRows");
    	var indices = [];
    	var multiChoice = new MultiChoice(choices, indices);
    	
    	self.add(multiChoice);
    }
    else {
    	var title = Ti.UI.createLabel({
			text: "Currently no options for " + _category, 
			top: 50, 
		});
		self.add(title);
    }
	
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
}
module.exports = SelectorView;