function SearchView (_neonClass, _requestType){
	hub = require("hub");
	var iconWidth = hub.API.app_width/5.1; 
	var margin_offset = (hub.API.app_width-350*hub.API.wsf)/2;
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;

	var createMenuRow = function(item, _category, table) {
		var category = item;
		var tableHasChild = true; 
		if (item === "has_more"){tableHasChild = false; }
		var tableRow = Ti.UI.createTableViewRow({
			className: 'itemRow',
			backgroundColor: hub.API.menuRowBlue,
			hasChild: true, 
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:5,
			borderWidth:1,
		});
	
		var titleView = Ti.UI.createView({
			bottom: 5,
			height: 50,
			width: "100%",
			right: 5, 
			left: 5,
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
			});
		}
		else{
			var titleLabel = Ti.UI.createLabel({
				text: item,
				width: 'auto',
				color: '#5e656a',
				left: 5,
				top: 20,
				font: {
					fontSize: 20*hsf,
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
			if (_requestType == "Activity"){
				hub.API.fetchActivity("users", (hub.API.searchResults.getPage() + 1), o);
			}else{
				hub.API.fetchResults("users", hub.API.user.getFilterCriterion(), (hub.API.searchResults.getPage() + 1), o);
			}
			
		}
		else{
			if (_requestType == "Activity"){
				hub.API.fetchActivity(_category,(hub.API.searchResults.getPage() + 1), o);
				
			}
			else{
				hub.API.fetchResults(_category, hub.API.user.getFilterCriterion(), (hub.API.searchResults.getPage() + 1), o);
			}
		}
	}; 
	
	function populateTable(table){
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
 		
 		var tableRows = [];
		var separatorView = Ti.UI.createView({
			height: 5, 
			backgroundColor:hub.API.customBgColor,
		});
		
		for (var i = 0; i < data.length; i++) {
			tableRows.push(createMenuRow(data[i], _neonClass, table));
			tableRows.push(addRowView(separatorView)); 
		}
		
		table.setData(tableRows); 
	}
	
	function buildSearchView(_requestType, win){
		
		var self = Ti.UI.createView({
			backgroundColor:hub.API.customBgColor,
			layout: 'vertical', 
		});
			
		var nonScrollView = Ti.UI.createView({
			top: 3,
			height: 60*hsf, 
			layout:'vertical'
		});
		
		tlText = "Search Results"; 
		if (_requestType == "Activity"){
			tlText = "My Activity"
		}
			
		var titleLabel = Ti.UI.createLabel({
			layout:'horizontal', 
			top:3,
			text: "Search Results", 
			color: hub.API.customTextColor,
			height: 60*hsf,
			font: {
				fontWeight: 'bold',
				fontSize: 25*hsf,
			},
			left: 5,
		});

		
		var table = Ti.UI.createTableView({
			top:0,
			separatorColor: 'transparent',
			backgroundColor:hub.API.customBgColor,
		});
		
		populateTable(table); 
		table.addEventListener('click', function(e){
			var neonPath = hub.API.searchResults.getNeonPath(e.index);
			var neonType = hub.API.searchResults.getNeonType(e.index);

			if (neonPath)
			{
				var o = {
					start: function(){
						win.showIndicator("Fetching " + neonType + "...");
					},
					error: function(){
						Ti.API.info("Error Fetching " + neonType);
						win.hideIndicator(); 
					},
					success: function(neon){
						
						win.hideIndicator();
						if (neonType === "Person"){
							hub.API.showUser(neon, _requestType);
						}else{
							hub.API.showNeon(neon, _requestType);
						}
						
					}
				}; 
				hub.API.fetchNeon(neonPath, o);
			}
		});	
		
		nonScrollView.add(titleLabel);
		
		self.add(nonScrollView); 
		self.add(table);
		
		return(self);
	}

	var appWindow = require("ui/common/UserView");
    search_win = new appWindow(_requestType);
	self = buildSearchView(_requestType, search_win); 
	search_win.addContent(self);

	thisWindow = search_win.appwin;
	return thisWindow;
	
}
	
module.exports = SearchView;