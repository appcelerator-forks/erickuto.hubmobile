

function SearchView (_authToken){
	var iconWidth = hubAPI.app_width/5.1; 
	var margin_offset = (hubAPI.app_width-350*hubAPI.wsf)/2;
	var all_activity_offset = 0; 
	var select_activity_offset = 30; 
	var user = hubAPI.user; 
	var selectedIconColor = '275378'; 
	var unselectedIconColor = 'f1f2f6'; 
	var explorer = null; 
	
	var icons = []; 
	
	var tableHolder = Ti.UI.createView({
		top: 0, 
	});
		
	var titleLabel = Ti.UI.createLabel({
			top:3,
			text: "", 
			color: hubAPI.customTextColor,
			height: 20,
			font: {
				fontWeight: 'bold',
				fontSize: 18,
			},
			left: 5,
	});
	
	var loadTable = function(_data, _category){
		
		if (_category === "indicator"){
			
			displayView = Ti.UI.createView(); 
			hubAPI.indicate('Results', displayView);
			populateTableHolder(displayView);
		}
		else{
			var table = Ti.UI.createTableView({
				top:0,
				separatorColor: 'transparent',
				backgroundColor: hubAPI.customBgColor,
			});
			
			var tableRows = [];
		
			for (var i = 0; i < _data.length; i++) {
				tableRows.push(createMenuRow(_data[i], _category));
			}
			
			table.addEventListener('click', function(e){
				var neon = hubAPI.searchResults.getNeon(e.index);
				if (neon)
				{
					NeonView = require("ui/common/dashboardViews/exploreViews/NeonView");
					var neon = hubAPI.searchResults.getNeon(e.index);
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
				tableHolder.remove(removeData[i]);
			}
			removeData = null; 
		}
		
		tableHolder.add(_addition);
	}; 
	
	var loadResults = function(_category){
		//Change the icons
		for (var i = 0; i < icons.length; i++){
			
			if (icons[i].category === _category){
				titleLabel.text = _category.charAt(0).toUpperCase() + _category.slice(1);
				//Change the background of the icon
				icons[i].children[0].backgroundColor = selectedIconColor; 
				//Change the image of the icon
				icons[i].children[0].children[0].image = hubAPI.imagePath('search_' + _category + '_selected.png');
				//Change the color of the background of the ticker
				icons[i].children[1].backgroundColor = unselectedIconColor; 
				//Change the color of the text of the ticker
				icons[i].children[1].color = selectedIconColor; 
			
				icons[i].status = "selected";
				
			}
			//Unselect the other icon
			else if (icons[i].status === "selected"){
				//Change the background of the icon
				icons[i].children[0].backgroundColor = unselectedIconColor; 
				//Change the image of the icon
				icons[i].children[0].children[0].image = hubAPI.imagePath('search_' + icons[i].category + '_unselected.png');
				//Change the color of the background of the ticker
				icons[i].children[1].backgroundColor = selectedIconColor; 
				//Change the color of the text of the ticker
				icons[i].children[1].color = unselectedIconColor; 
				
				icons[i].status = "unselected";
	
			}
		}
		
		//Change the results
		//Start the activity indicator
		
		loadTable([], "indicator");
		//Call the method for fetching functions. 
		if (_category === "people"){
			hubAPI.fetchResults("users", "most_recent", 0);
		}
		else{
			hubAPI.fetchResults(_category, "most_recent", 0);
		}
		Ti.App.fireEvent("Results");
		
		//Fetch the returned results 
		Ti.App.addEventListener('showFetchResults', function (){
			var sResults = [];
			var data = []; 
			hubAPI.searchResults.getResults(sResults); 
			for (i = 0; i < sResults.length; i++){
				if (sResults[i].neonTitle){
					data.push(sResults[i].neonTitle);
				}
				else{
					data.push(sResults[i].displayName);
				}
	 			
	 		}
	 		if (hubAPI.searchResults.hasMore()){
	 			data.push("has_more");
	 		}
	 		loadTable(data, _category);
		});
		
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
			image: hubAPI.imagePath(imageName),
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
			width: (hubAPI.app_width - 10),
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
				image: hubAPI.imagePath('more.png'),
			});
			titleView.add(titleImage);
			tableRow.addEventListener('click', function(e) {
				
				//Start the activity indicator
				loadTable([], "indicator");
				if (_category === "people"){
					hubAPI.fetchResults("users", "most_recent", (hubAPI.searchResults.getPage() + 1));
				}
				else{
					hubAPI.fetchResults(_category, "most_recent", (hubAPI.searchResults.getPage() + 1));
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
	
	function buildSearchView(){
		
		var self = Ti.UI.createView({
			backgroundColor:hubAPI.customBgColor,
			layout: 'vertical', 
			table: null
		});
			
		var nonScrollView = Ti.UI.createView({
			top: 3,
			height: 140, 
			layout:'vertical'
		});
		
		var iconsView = Ti.UI.createView({
			top:0,
			height: 50, 
			backgroundColor: hubAPI.customBgColor, 
			layout:'horizontal'
		});
		
		var iconNames = ['people', 'offers', 'needs', 'events', 'ideas'];
		icons = []; 
		for (var i = 0; i < iconNames.length; i++){
			icons.push(createSearchIcon('unselected', iconNames[i], hubAPI.searchResults.getCounts(iconNames[i])));
			iconsView.add(icons[i]);
		}
		
		var sortView = Ti.UI.createView({
			top: 5,
			height: 40,  
			layout:'horizontal', 
			backgroundColor: 'ebebeb',
			borderWidth: 1, 
			borderColor: 'd7dbde',
		});
		
		var titleView = Ti.UI.createView({
			top: 0, 
			height: 30, 
			layout:'horizontal', 
			borderColor: 'd7dbde',
			borderWidth: 1,
		});
		self.add(nonScrollView);
		
		sortView.add(Ti.UI.createLabel({
			top:3,
			text: "Sort by:", 
			color: hubAPI.customTextColor,
			height: 30,
			font: {
				fontWeight: 'bold',
				fontSize: 19,
			},
			left: 5,
		}));
		
		var mostRecent = Ti.UI.createLabel({
			top:3,
			text: "Most Recent", 
			color: 'blue',
			height: 30,
			font: {
				fontWeight: 'bold',
				fontSize: 16,
			},
			left: 5,
		});
		
		sortView.add(mostRecent);
		
		sortView.add(Ti.UI.createLabel({
			top:3,
			text: " | ", 
			color: hubAPI.customTextColor,
			height: 30,
			font: {
				fontWeight: 'bold',
				fontSize: 18,
			},
			left: 5,
		}));
		
		var mostFollowed = Ti.UI.createLabel({
			top:3,
			text: "Most Followed", 
			color: hubAPI.customTextColor,
			height: 30,
			font: {
				fontSize: 16,
			},
			left: 5,
		});
		
		
		sortView.add(mostFollowed);
		titleView.add(titleLabel);
		
		nonScrollView.add(iconsView, sortView, titleView);
		var views = [];
		
		self.add(tableHolder); 
		loadResults("people");
		return(self);
	}

	var appWindow = require("ui/common/UserView");
    search_win = new appWindow();

	if (!hubAPI.searchResults.isReady()){
		//Wait on Results. 
		search_win.clearCanvas(); 
		displayView = Ti.UI.createView(); 
		hubAPI.indicate('Results', displayView);
		search_win.addContent(displayView);
	}
	else{
		search_win.clearCanvas(); 
		self = buildSearchView(); 
		search_win.addContent(self);
	}
	
	Ti.App.addEventListener("showSearchPage", function(){
		search_win.clearCanvas(); 
		Ti.App.fireEvent("stopIndicator");
		self = buildSearchView(); 
		search_win.addContent(self);
	})
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