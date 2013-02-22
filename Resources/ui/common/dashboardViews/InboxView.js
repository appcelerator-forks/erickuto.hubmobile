

function InboxView (_authToken){
	var iconWidth = hubAPI.app_width/3.7; 
	var margin_offset = (hubAPI.app_width-350*hubAPI.wsf)/2;
	
	var user = hubAPI.user; 
	var selectedIconColor = '275378'; 
	var unselectedIconColor = 'f1f2f6'; 
	var explorer = null; 
	
	var icons = []; 
	
	var tableHolder = Ti.UI.createView({
		top: 0, 
		layout: 'vertical',
	});
		
	var loadTable = function(_data, _category){
		
		if (_category === "indicator"){
			
			displayView = Ti.UI.createView(); 
			hubAPI.indicate('Messages', displayView);
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
				if (removeData[i]){
					tableHolder.remove(removeData[i]);
				}
			}
			removeData = null; 
		}
		
		tableHolder.add(_addition);
	}; 
	
	var loadResults = function(_category){
		//Change the icons
		for (var i = 0; i < icons.length; i++){
			
			if (icons[i].category === _category){
				//Change the background of the icon
				icons[i].children[0].backgroundColor = selectedIconColor; 
				//Change the image of the icon
				icons[i].children[0].children[0].color = unselectedIconColor;
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
				icons[i].children[0].children[0].color = selectedIconColor; 
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
		hubAPI.fetchMessages(_category.toLowerCase(), 0);
		
		Ti.App.fireEvent("Messages");
		
		//Fetch the returned results 
		Ti.App.addEventListener('showMessages', function (){
			var sResults = [];
			var data = []; 
			hubAPI.messages.getMessages(sResults); 
			for (i = 0; i < sResults.length; i++){
				data.push(sResults[i]);
				
	 		}
	 		if (hubAPI.messages.hasMore()){
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
		
		var iconLabel = Ti.UI.createLabel({
			text: _iconName, 
			color: tickerColor,
			height: 30,
			font: {
				fontSize: 15, 
				fontWeight: 'bold',
			}, 
			width: 70, 
			left: 10,
			top: 1,
		});
		
		icon.add(iconLabel);
		
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
		var tableRow = Ti.UI.createTableViewRow({
			className: 'itemRow',
			category: category,
			hasChild: false, 
		});
		
		var titleView = Ti.UI.createView({
			backgroundColor: 'e5eaf0',
			bottom: 1,
			height: 70,
			width: (hubAPI.app_width - 2),
			right: 1, 
			left: 0,
			borderColor:'#e0e0e0',
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
			
			var messageHolder = Ti.UI.createView({
				layout: 'horizontal', 
				top: 0, 
				left: 0,
			});
			var sender = item.participants[item.participants.length-1];//.participants[participants.length-1];
			var messageIcon = Ti.UI.createImageView({
				image: sender.avatarUrl,
				width: 50, 
				top: 0,
				left: 0,
			});

			var messageTitle = Ti.UI.createView({
				top: 0, 
				left: 2, 
				
			});
			
			var messageDetails = Ti.UI.createView({
				top:0, 
				left: 5, 
			});
			
			messageSenderText = sender.displayName;
			if (item.messageCount){
				messageSenderText = messageSenderText + "(" + item.messageCount + ")";
			} 
			var messageSender = Ti.UI.createLabel({
				text: messageSenderText,
				width: 'auto',
				color: '#5e656a',
				left: 0,
				top: 0,
				font: {
					fontSize: 12
				},
				
			});
			
			var messageTime = Ti.UI.createLabel({
				text: item.lastUpdatedFormatted,
				width: 'auto',
				color: 'black',
				right: 3,
				top: 0,
				font: {
					fontSize: 11
				},
				
			});
			
			messageTitle.add(messageSender, messageTime);
			
			var messageSubject = Ti.UI.createLabel({
				text: item.messageSubject,
				width: 'auto',
				color: 'black',
				top: 30,
				left: 5,
				font: {
					fontSize: 13
				},
				
			});
			
			
			messageDetails.add(messageTitle);
			messageDetails.add(messageSubject);
			
			messageHolder.add(messageIcon, messageDetails);
			titleView.add(messageHolder);
	
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
	
	function buildInboxView(){
		
		var self = Ti.UI.createView({
			backgroundColor:hubAPI.customBgColor,
			layout: 'vertical', 
		});
			
		var nonScrollView = Ti.UI.createView({
			top: 3,
			height: 60, 
			layout:'vertical'
		});
		
		var iconsView = Ti.UI.createView({
			top:0,
			height: 50, 
			backgroundColor: hubAPI.customBgColor, 
			layout:'horizontal'
		});
		
		var iconNames = ['Inbox', 'Sent', 'Archived'];
		icons = []; 
		for (var i = 0; i < iconNames.length; i++){
			icons.push(createSearchIcon('unselected', iconNames[i], hubAPI.messages.getCounts(iconNames[i])));
			iconsView.add(icons[i]);
		}
		var newMessageButton = Ti.UI.createImageView({
			image: hubAPI.imagePath("new_message_icon.png"),
			height: 35, 
			width: 40, 
			left: 7, 
			top: 7,
		});
		iconsView.add(newMessageButton);
		
		self.add(nonScrollView);
		
		nonScrollView.add(iconsView);
		var views = [];
		
		self.add(tableHolder); 
		loadResults("Inbox");
		return(self);
	}

	var appWindow = require("ui/common/UserView");
    inbox_win = new appWindow();
	
	if (!hubAPI.messages.isReady()){
		//Wait on Results. 
		inbox_win.clearCanvas(); 
		displayView = Ti.UI.createView(); 
		hubAPI.indicate('Messages', displayView);
		inbox_win.addContent(displayView);
	}
	else{
		inbox_win.clearCanvas(); 
		self = buildInboxView(); 
		inbox_win.addContent(self);
	}
	
	Ti.App.addEventListener("showMessagePage", function(){
		inbox_win.clearCanvas(); 
		Ti.App.fireEvent("stopIndicator");
		self = buildInboxView(); 
		inbox_win.addContent(self);
	})
	/*Ti.App.addEventListener("refreshSearchResults", function(){
		Ti.API.info("Refreshing. ");
		win.close();  
		inbox_win.clearCanvas(); 
		self = buildInboxView(); 
		inbox_win.addContent(self);
	});*/
	thisWindow = inbox_win.appwin;
	return thisWindow;
	}
module.exports = InboxView;