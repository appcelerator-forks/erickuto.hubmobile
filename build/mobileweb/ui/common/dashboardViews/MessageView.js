
function MessageView (_authToken){
	hub = require("hub");
	var iconWidth = hub.API.app_width/5.1; 
	var margin_offset = (hub.API.app_width-350*hub.API.wsf)/2;

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
				MessageListView = require("ui/common/dashboardViews/messageViews/MessageListView");
				var messageListView = new MessageListView(_category); 
				hub.API.openWindow(messageListView);
			}
		}; 

		hub.API.fetchMessages(_category, 0, o);
	}; 
	
	var createOptionRow = function(item) {
		
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
			image: hub.API.imagePath('message_' + item + '_unselected.png'),
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
		var selectedSize = hub.API.messages.getCounts(labelText);
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
	
	function buildMessageView(){
		
		var self = Ti.UI.createView({
			backgroundColor:hub.API.customBgColor,
			layout: 'vertical', 
		});
		
		var table = Ti.UI.createTableView({
			top:0,
			separatorColor: 'transparent',
			backgroundColor:hub.API.customBgColor,
		});

		var data = ['inbox', 'sent', 'archived'];

		var rows = [];
		
		for (var i = 0; i < data.length; i++) {
			rows.push(createOptionRow(data[i]));
		}
		 
		table.setData(rows);

		self.add(table);
		
		return(self);
	}

	var appWindow = require("ui/common/UserView");
    message_win = new appWindow("Inbox");
	self = buildMessageView(); 
	message_win.addContent(self);

	var newMessageEvent = function(){
		hub.API.newMessage();
	}
	message_win.changeRightButtonEvent(newMessageEvent, "new"); 

	thisWindow = message_win.appwin;
	return thisWindow;
	}
module.exports = MessageView;