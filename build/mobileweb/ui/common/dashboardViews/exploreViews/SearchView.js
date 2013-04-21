

function SearchView (_authToken){
	hub = require("hub");
	var iconWidth = hub.API.app_width/5.1; 
	var margin_offset = (hub.API.app_width-350*hub.API.wsf)/2;
	var all_activity_offset = 0; 
	var select_activity_offset = 30; 
	var user = hub.API.user; 
	var selectedIconColor = '275378'; 
	var unselectedIconColor = 'f1f2f6'; 
	var explorer = null; 
	
	var icons = []; 
	
	var tableHolder = Ti.UI.createView({
		top: 0, 
	});
	
	var loadTable = function(_data, _category){
		
		if (_category === "indicator"){
			
			displayView = Ti.UI.createView(); 
			hub.API.indicate('Results', displayView);
			populateTableHolder(displayView);
		}
		else{
			var table = Ti.UI.createTableView({
				top:0,
				separatorColor: 'transparent',
				backgroundColor: hub.API.customBgColor,
			});
			
			var tableRows = [];
		
			for (var i = 0; i < _data.length; i++) {
				tableRows.push(createMenuRow(_data[i], _category));
			}
			
			table.addEventListener('click', function(e){
				var neon = hub.API.searchResults.getNeon(e.index);
				if (neon)
				{
					NeonView = require("ui/common/dashboardViews/exploreViews/NeonView");
					var neonView = new NeonView(neon); 
					Ti.App.globalWindow = neonView;
					Ti.App.fireEvent('openWindow',{});
				}
			});	
			table.setData(tableRows);
			populateTableHolder(table);
		}
			
		
	}; 
	
	//Clears the tableHolder and adds the addition
	var populateTableHolder = function(_addition){
		if (tableHolder && tableHolder.children != undefined){
			var removeData = []; 
			for (i = tableHolder.children.length; i > 0; i--){
				removeData.push(tableHolder.children[i-1]);
			}
			
			for (i = 0; i < removeData.length; i++){
				if (removeData[i]){
					tableHolder.remove(removeData[i]);
				}
			}
			removeData = null; 
		}
		
		tableHolder.add(_addition);
	}; 
	
	var loadResults = function(_category){
		
		
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
				/*SearchView = require("ui/common/dashboardViews/exploreViews/SearchView");
				var searchView = new SearchView(); 
				hub.API.openWindow(searchView);*/
				Ti.API.info("Found Sub Results");
			}
		}; 

		if (_category === "people"){
			hub.API.fetchResults("users", "most_recent", 0, o);
		}
		else{
			hub.API.fetchResults(_category, "most_recent", 0, o);
		}

		/*
		//Fetch the returned results 
		Ti.App.addEventListener('showFetchResults', function (){
			var sResults = [];
			var data = []; 
			hub.API.searchResults.getResults(sResults); 
			for (i = 0; i < sResults.length; i++){
				if (sResults[i].neonTitle){
					data.push(sResults[i].neonTitle);
				}
				else{
					data.push(sResults[i].displayName);
				}
	 			
	 		}
	 		if (hub.API.searchResults.hasMore()){
	 			data.push("has_more");
	 		}
	 		loadTable(data, _category);
		});
		*/
		//Display the results. 
		
		//self.children[1].backgroundColor = 'blue'; 
	}; 
	
	var createSearchIcon = function(_status, _iconName, _amount){
		var iconColor = unselectedIconColor; 
		var tickerColor = selectedIconColor; 
		var	textColor = unselectedIconColor; 
		var imageName = 'search_' + _iconName + '_' + _status + '.png'; 
		
		if (_status === "selected"){
			iconColor = selectedIconColor; 
			tickerColor = unselectedIconColor; 
			textColor = selectedIconColor; 
		}
		canvas = Ti.UI.createView({
			top:5, 
			height: 40,
			width: iconWidth, 
		});
		
		canvas.category = _iconName; 
		canvas.status = _status; 
		
		icon = Ti.UI.createView({
			top:8, 
			height: 30,
			width: iconWidth - 10, 
			left: 5,  
			backgroundColor: iconColor,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:7,
		});
		
		var imageView = Ti.UI.createImageView({
			image: hub.API.imagePath(imageName),
			height: 30, 
			width: 30, 
			left: 7,
			top: 1,
		});
		
		icon.add(imageView);
		
		ticker = Ti.UI.createLabel({
			top:0, 
			height: 20, 
			width: 30, 
			right: 0, 
			font: {
				fontSize: 11, 
				fontWeight: 'bold',
			},
			color: textColor,
			text: ' ' + _amount,
			backgroundColor: tickerColor, 
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:7,
		});
		canvas.add(icon);
		canvas.add(ticker);
		canvas.addEventListener('click', function(event){
			loadResults(_iconName);
		});
		return canvas; 
	}
	
	var createMenuRow = function(item, _category) {
		var category = item;
		var tableHasChild = true; 
		if (item === "has_more"){tableHasChild = false; }
		var tableRow = Ti.UI.createTableViewRow({
			className: 'itemRow',
			category: category,
			hasChild: tableHasChild, 
		});
		
		var titleView = Ti.UI.createView({
			backgroundColor: 'e5eaf0',
			bottom: 5,
			height: 50,
			width: (hub.API.app_width - 10),
			right: 5, 
			left: 5,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:5,
			borderWidth:1,
			layout:'horizontal'
		});
		
		if (item === "has_more"){
			titleView.backgroundColor = "003a5f";
			titleImage = Ti.UI.createImageView({
				top: 5, 
				width: 250, 
				image: hub.API.imagePath('more.png'),
			});
			titleView.add(titleImage);
			tableRow.addEventListener('click', function(e) {
				
				//Start the activity indicator
				loadTable([], "indicator");
				if (_category === "people"){
					hub.API.fetchResults("users", "most_recent", (hub.API.searchResults.getPage() + 1));
				}
				else{
					hub.API.fetchResults(_category, "most_recent", (hub.API.searchResults.getPage() + 1));
				}
				Ti.App.fireEvent("Results");
			});
		}
		else{
			
			var titleLabel = Ti.UI.createLabel({
				text: item,
				width: 'auto',
				color: '#5e656a',
				left: 5,
				top: 10,
				font: {
					fontSize: 16
				},
				
			});
			
			titleView.add(titleLabel);
	
		}
		tableRow.add(titleView);
		return tableRow;
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
	
	var createOptionRow = function(item, count) {
		var selectedSize = count; 
		var tableRow = Ti.UI.createTableViewRow({
			className: 'itemRow',
			hasChild: true, 
		});
	
		var titleView = Ti.UI.createView({
			backgroundColor: 'e5eaf0',
			bottom: 5,
			height: 60,
			width: (hub.API.app_width - 10),
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
			left: 7,
			top: 20,
		});
		
		labelText = item.charAt(0).toUpperCase() + item.slice(1);
		var titleLabel = Ti.UI.createLabel({
			text: labelText,
			width: 'auto',
			color: '#5e656a',
			left: 10,
			top: 20,
			font: {
				fontSize: 16
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
				fontSize: 16
			},
		});
		
		tableRow.sizeLabel = sizeLabel; 
		titleView.add(titleIcon);
		titleView.add(titleLabel);
		titleView.add(sizeLabel);
		tableRow.add(titleView);
		tableRow.addEventListener('click', function(e) {
			loadResults(item); 
		});
		return tableRow;
	};
	
	function buildSearchView(){
		
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

		var data = ['people', 'offers', 'needs', 'events', 'ideas'];

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
	self = buildSearchView(); 
	search_win.addContent(self);

	/*Ti.App.addEventListener("refreshSearchResults", function(){
		Ti.API.info("Refreshing. ");
		win.close();  
		search_win.clearCanvas(); 
		self = buildSearchView(); 
		search_win.addContent(self);
	});*/
	thisWindow = search_win.appwin;
	return thisWindow;
	}
module.exports = SearchView;