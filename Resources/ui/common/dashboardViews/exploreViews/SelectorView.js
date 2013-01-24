function SelectorView(_category, _explorer) {
	var appWindow = require("ui/common/UserView");
    win = new appWindow();
    
    var choices = [];
    _explorer.getChoices(_category, choices); 
    var self = Ti.UI.createView();
    
    var user = Ti.App.user; 
	var selection = user.getSelectedOptions(_category);
	
    if (choices.length > 0){
    	MultiChoice = require("ui/common/tableViewMultiSelectRows");
    	
    	var multiChoice = new MultiChoice(choices, selection);
    	
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
	win.addOnCloseEvent('updateSizes');
	thisWindow = win.appwin;
	return thisWindow;
}
module.exports = SelectorView;