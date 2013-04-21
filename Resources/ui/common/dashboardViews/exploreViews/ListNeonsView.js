function SearchView (_neonClass){
	hub = require("hub");
	var iconWidth = hub.API.app_width/5.1; 
	var margin_offset = (hub.API.app_width-350*hub.API.wsf)/2;
	

	var createMenuRow = function(item, _category, table) {
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
				var dummyRows = []; 
				table.setData(dummyRows);
				
				loadResults(_neonClass, table); 
				 
				/*
				//Start the activity indicator
				loadTable([], "indicator");
				if (_category === "people"){
					hub.API.fetchResults("users", "most_recent", (hub.API.searchResults.getPage() + 1));
				}
				else{
					hub.API.fetchResults(_category, "most_recent", (hub.API.searchResults.getPage() + 1));
				}
				*/
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

	var loadResults = function(_category, table){
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
				populateTable(table);
			}
		}; 

		if (_category === "people"){
			hub.API.fetchResults("users", "most_recent", (hub.API.searchResults.getPage() + 1), o);
		}
		else{
			hub.API.fetchResults(_category, "most_recent", (hub.API.searchResults.getPage() + 1), o);
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
	function populateTable(table){
		var sResults = [];
		var data = []; 
		hub.API.searchResults.getResults(sResults); 
		
		for (i = 0; i < sResults.length; i++){
			if (sResults[i].neonTitle){
				data.push(sResults[i].neonTitle);
				Ti.API.info(i.toString() + " :" + sResults[i].neonTitle);
			}
			else{
				data.push(sResults[i].displayName);
			}
 		}
 		if (hub.API.searchResults.hasMore()){
 			data.push("has_more");
 		}
 		
 		var tableRows = [];
	
		for (var i = 0; i < data.length; i++) {
			tableRows.push(createMenuRow(data[i], _neonClass, table));
		}
		
		table.setData(tableRows); 
	}
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
		
		populateTable(table); 
		/*
		table.addEventListener('click', function(e){
			var neon = hub.API.searchResults.getNeon(e.index);
			if (neon)
			{
				NeonView = require("ui/common/dashboardViews/exploreViews/NeonView");
				var neonView = new NeonView(neon); 
				Ti.App.globalWindow = neonView;
				Ti.App.fireEvent('openWindow',{});
			}
		});	*/
		
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