function ActivityView (_authToken){
	hub = require("hub");
	var iconWidth = hub.API.app_width/5.1; 
	var margin_offset = (hub.API.app_width-350*hub.API.wsf)/2;
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	
	var loadResults = function(_category, win){
		var o = {
			start: function(){
				win.showIndicator("Fetching " + _category + "...");
			},
			error: function(){
				Ti.API.info("Error Fetching " + _category);
				win.hideIndicator(); 
			},
			success: function(){
				win.hideIndicator();
				ListNeonsView = require("ui/common/dashboardViews/exploreViews/ListNeonsView");
				var listNeonsView = new ListNeonsView(_category, "Activity"); 
				hub.API.openWindow(listNeonsView);
			}
		}; 

		if (_category === "people"){
			hub.API.fetchActivity("users", 0, o);
		}
		else{
			hub.API.fetchActivity(_category, 0, o);
		}
	}; 
	
	var addRowView = function(_view) {
		var tablerow = Ti.UI.createTableViewRow({
			hasChild: false,
			touchEnabled: false,
			focusable:false,
			height: _view.height,
		});
	
		tablerow.add(_view);
		
		return tablerow;
	};
	
	var createOptionRow = function(item, count, win) {
		var selectedSize = count; 
		var tableRow = Ti.UI.createTableViewRow({
			className: 'itemRow',
			backgroundColor: hub.API.menuRowBlue,
			hasChild: true, 
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			height: 60*hsf,
			borderColor:'#e0e0e0',
			borderRadius:5,
			borderWidth:1,
		});
	
		var titleView = Ti.UI.createView({
			height: 60*hsf,
			width: "100%",
			right: 5, 
			left: 5,
			layout:'horizontal'
		});
		
		
		var titleIcon = Ti.UI.createImageView({
			image: hub.API.imagePath(('search_' + item + '_unselected.png'), 1),
			width: 40*wsf, 
			left: 0, 
			top: 5*hsf,
		});
		
		labelText = item.charAt(0).toUpperCase() + item.slice(1);
		var titleLabel = Ti.UI.createLabel({
			text: labelText,
			width: 'auto',
			color: '#5e656a',
			left: 5, 
			top: 10*hsf,
			font: {
				fontSize: 25*hsf
			},
			
		});
	
		var sizeText = "";
		if (selectedSize > 0){
			sizeText = "(" + selectedSize + ")";
		}
		var sizeLabel = Ti.UI.createLabel({
			text: sizeText, 
			color: '#5e656a',
			width: 'auto',
			left: 5,
			top: 10*hsf,
			font: {
				fontSize: 25*hsf
			},
		});
		
		tableRow.sizeLabel = sizeLabel; 
		titleView.add(titleIcon);
		titleView.add(titleLabel);
		titleView.add(sizeLabel);
		tableRow.add(titleView);
		tableRow.addEventListener('click', function(e) {
			loadResults(item, win); 
		});
		return tableRow;
	};
	
	function buildActivityView(win){
		
		var self = Ti.UI.createView({
			backgroundColor:hub.API.customBgColor,
			layout: 'vertical', 
		});
			
		var nonScrollView = Ti.UI.createView({
			top: 3,
			height: 50*hsf, 
			layout:'vertical'
		});
		
		var titleLabel = Ti.UI.createLabel({

			layout:'horizontal', 
			top:3,
			text: "My Activities", 
			color: hub.API.customTextColor,
			height: 50*hsf,
			font: {
				fontWeight: 'bold',
				fontSize: 25*hsf,
			},
			left: 5,
		});

		Ti.API.info("HSF = " + hsf);
		var table = Ti.UI.createTableView({
			top:0,
			separatorColor: hub.API.customBgColor,
			backgroundColor:hub.API.customBgColor,
		});

		var data = ['people', 'offers', 'needs', 'events', 'news', 'ideas'];

		var rows = [];
		
		var separatorView = Ti.UI.createView({
			height: 5*hsf, 
			backgroundColor:hub.API.customBgColor,
		});
		for (var i = 0; i < data.length; i++) {
			rows.push(createOptionRow(data[i], hub.API.searchResults.getCounts(data[i]), win));
			rows.push(addRowView(separatorView));
		}
		 
		table.setData(rows);
		nonScrollView.add(titleLabel);
		
		self.add(nonScrollView); 
		self.add(table);
		
		return(self);
	}

	var appWindow = require("ui/common/UserView");
    search_win = new appWindow("Activity");
	self = buildActivityView(search_win); 
	search_win.addContent(self);

	thisWindow = search_win.appwin;
	return thisWindow;
	}
module.exports = ActivityView;