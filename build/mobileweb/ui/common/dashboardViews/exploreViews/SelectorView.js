function SelectorView(_category, _explorer) {
	var appWindow = require("ui/common/UserView");
    win = new appWindow("Explore");
    hub = require("hub");
    
    var choices = [];
    _explorer.getChoices(_category, choices); 
    var self = Ti.UI.createView();
    
    var user = hub.API.user; 
	var selection = user.getSelectedOptions(_category);
	
	if (_category == "free"){
    	AutoComplete = require("ui/common/dashboardViews/exploreViews/AutoCompleteView");
    	if (choices.length > 0){
    		var autoComplete = new AutoComplete(choices);
    		self.add(autoComplete);
    	}
    	else{
    		var title = Ti.UI.createLabel({
				text: "Error: Hub Mobile was unable to fetch tags. ", 
				top: 50, 
			});
			self.add(title);
    	}
    }
    else if (choices.length > 0){
    	MultiChoice = require("ui/common/tableViewMultiSelectRows");
    	var multiChoice = new MultiChoice(choices, selection, _category);
    	self.add(multiChoice);
    }
    else {
    	var title = Ti.UI.createLabel({
			text: "Loading " + _category + "...", 
			top: 50, 
		});
		if (_category == "groups"){
			title.text = "There are no groups to choose from. Please select a community first or join one.";
		}
		else if (_category == "countries"){
			title.text = "There no countries to choose from. \nPlease select a region first."; 
		}
		else if (_category == "cities"){
			title.text = "There no cities to choose from. \nPlease select a country first. Note that there may be countries without tagged cities, provinces or locations"; 
		}
		self.add(title);
    }
	
	win.addContent(self);
	win.addOnCloseEvent('updateSizes');
	thisWindow = win.appwin;
	return thisWindow;
}
module.exports = SelectorView;