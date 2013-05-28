
function SearchView (_authToken){
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
				var listNeonsView = new ListNeonsView(_category, "Explore"); 
				hub.API.openWindow(listNeonsView);
			}
		}; 

		if (_category === "people"){
			hub.API.fetchResults("users", hub.API.user.getFilterCriterion(), 0, o);
		}
		else{
			hub.API.fetchResults(_category, hub.API.user.getFilterCriterion(), 0, o);
		}
	}; 
	
	var addRowView = function(_view) {
		var tablerow = Ti.UI.createTableViewRow({
			hasChild: false,
			touchEnabled: false,
			selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE, 
			focusable:false,
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
		});
	
		var titleView = Ti.UI.createView({
			backgroundColor: hub.API.menuRowBlue,
			bottom: 5,
			height: 60,
			width: "100%",
			right: 5, 
			left: 5,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:5,
			borderWidth:1,
			layout:'horizontal'
		});
		
		
		var titleIcon = Ti.UI.createImageView({
			image: hub.API.imagePath('search_' + item + '_unselected.png'),
			height: 30, 
			width: 30, 
			left: 0, 
			top: 20,
		});
		
		labelText = item.charAt(0).toUpperCase() + item.slice(1);
		var titleLabel = Ti.UI.createLabel({
			text: labelText,
			width: 'auto',
			color: '#5e656a',
			top: 20,
			font: {
				fontSize: 18*hsf
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
			top: 20,
			font: {
				fontSize: 18*hsf
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
	
	function buildSearchView(win){
		
		var self = Ti.UI.createView({
			backgroundColor:hub.API.customBgColor,
			layout: 'vertical', 
		});
			
		var nonScrollView = Ti.UI.createView({
			top: 3,
			height: 30, 
			layout:'vertical'
		});
		
		var titleLabel = Ti.UI.createLabel({

			layout:'horizontal', 
			top:3,
			text: "Search Results", 
			color: hub.API.customTextColor,
			height: 20,
			font: {
				fontWeight: 'bold',
				fontSize: 18,
			},
			left: 5,
		});

		
		var table = Ti.UI.createTableView({
			top:0,
			separatorColor: 'transparent',
			backgroundColor:hub.API.customBgColor,
		});

		var data = ['people', 'offers', 'needs', 'events', 'news', 'ideas'];

		var rows = [];
		
		for (var i = 0; i < data.length; i++) {
			rows.push(createOptionRow(data[i], hub.API.searchResults.getCounts(data[i])));
		}
		 
		table.setData(rows);
		nonScrollView.add(titleLabel);
		
		self.add(nonScrollView); 
		self.add(table);
		
		return(self);
	}

	var appWindow = require("ui/common/UserView");
    search_win = new appWindow("Explore");
	self = buildSearchView(search_win); 
	search_win.addContent(self);

	thisWindow = search_win.appwin;
	return thisWindow;
	}
module.exports = SearchView;