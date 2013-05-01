function MessageListView (_messageClass){
	hub = require("hub");
	var iconWidth = hub.API.app_width/5.1; 
	var margin_offset = (hub.API.app_width-350*hub.API.wsf)/2;
	

	var createMenuRow = function(item) {

		var tableRow = Ti.UI.createTableViewRow({
			hasChild: false, 
		});
		
		var titleView = Ti.UI.createView({
			backgroundColor: '#e5eaf0',
			bottom: 1,
			height: 70,
			width: (hub.API.app_width - 2),
			right: 1, 
			left: 0,
			borderColor:'#e0e0e0',
			borderWidth:1,
			layout:'horizontal'
		});
		
		if (item === "has_more"){
			titleView.backgroundColor = "#003a5f";
			titleImage = Ti.UI.createImageView({
				top: 5, 
				width: 250, 
				image: hub.API.imagePath('more.png'),
			});
			titleView.add(titleImage);
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
			hub.API.fetchResults("users", "most_recent", (hub.API.messagelistResults.getPage() + 1), o);
		}
		else{
			hub.API.fetchResults(_category, "most_recent", (hub.API.messagelistResults.getPage() + 1), o);
		}
	}; 
	
	function populateTable(table){
		var sResults = [];
		hub.API.messages.getMessageThreads(sResults); 
 		if (hub.API.messages.hasMore()){
 			sResults.push("has_more");
 		}
		
		tableRows = []; 
		for (var i = 0; i < sResults.length; i++) {
			tableRows.push(createMenuRow(sResults[i]));
		}
		
		table.setData(tableRows);
	}
	
	function buildMessageListView(){
		
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
			text: _messageClass, 
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
		
		table.addEventListener('click', function(e){
			var message = hub.API.messages.getMessages(e.index);
			if (message)
			{
				MessageView = require("ui/common/dashboardViews/exploreViews/MessageView");
				var messageView = new MessageView(message); 
				hub.API.openWindow(messageView);
			}
		});
			
		nonScrollView.add(titleLabel);
		
		self.add(nonScrollView); 
		self.add(table);
		
		return(self);
	}

	var appWindow = require("ui/common/UserView");
    messagelist_win = new appWindow("Inbox");
	self = buildMessageListView(); 
	messagelist_win.addContent(self);

	var newMessageEvent = function(){
		hub.API.newMessage();
	}
	messagelist_win.changeRightButtonEvent(newMessageEvent, "new");
	
	thisWindow = messagelist_win.appwin;
	return thisWindow;
	
}
	
module.exports = MessageListView;