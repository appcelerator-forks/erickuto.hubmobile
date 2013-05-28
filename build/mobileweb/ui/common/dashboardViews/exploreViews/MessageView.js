
function messageView(message_thread){
	hub = require("hub");
	
	var margin_offset = (hub.API.app_width-350*hub.API.wsf)/2;
	
	var tableHolder = Ti.UI.createScrollView({
			top: 5, 
			layout: 'vertical',
		});
	var loadTable = function(_data){

		var scrollData = []; 
		
		var messagesView = Ti.UI.createTableViewRow({
			layout: 'vertical',
			height: Ti.UI.SIZE,
			hasChild: false,
			touchEnabled: false,
			selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE, 
			focusable:false,
		});

		var replyView = Ti.UI.createTableViewRow({
			layout: 'vertical',
			height: Ti.UI.SIZE,
			hasChild: false,
			touchEnabled: false,
			selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE, 
			focusable:false,
		});
		
		messages = _data.messages; 
		
		for (var i = 0; i < messages.length; i++) {
			messagesView.add(createMenuRow(messages[i], "message"));
		}
		
		var titleView = Ti.UI.createView({
			backgroundColor: 'e5eaf0',
			bottom: 1,
			width: (hub.API.app_width - 2),
			height: 125,
			right: 1, 
			left: 0,
			borderColor:'#e0e0e0',
			borderWidth:1,
			layout:'horizontal'
		});
		
		var messageHolder = Ti.UI.createView({
			layout: 'horizontal', 
			top: 0, 
			left: 0,
		});
		var messageIcon = Ti.UI.createImageView({
			image: "blah.jpg",//item.image_url,
			width: 50, 
			top: 0,
			left: 0,
		});

		var messageTitle = Ti.UI.createView({
			top: 0, 
			left: 2, 
			
		});
		
		var messageDetailsHolder = Ti.UI.createView({
			layout: 'vertical', 
			height: 120, 
			width: (hub.API.app_width - 60), 
		});
		var messageDetails = Ti.UI.createTextArea({
		  borderWidth: 2,
		  borderColor: '#bbb',
		  borderRadius: 5,
		  color: '#888',
		  font: {fontSize:15},
		  textAlign: 'left',
		  hintText:'I am a textarea',
		  top: 0,  left: 5,
		  width:"97%", height : 70,
		});
		
		var replyButton = Ti.UI.createImageView({
			image: hub.API.imagePath('reply.png'),
			width: 75, 
			top: 5,
			right: 5,
		});
		
		messageDetailsHolder.add(messageDetails, replyButton);
		messageHolder.add(messageIcon, messageDetailsHolder);
		titleView.add(messageHolder);

		replyView.add(titleView);
		scrollData.push(messagesView, replyView);
		var table = Ti.UI.createTableView({
		  data: scrollData,
		  top: 0, 
		});
		table.scrollToIndex(scrollData.length - 1, {
	        position : Titanium.UI.iPhone.TableViewScrollPosition.BOTTOM,
	    });
		populateTableHolder(table);

	}; 
	
	//Clears the tableHolder and adds the addition
	var populateTableHolder = function(_addition){
		tableHolder.add(_addition);
	}; 
	
	var loadResults = function(_category){
		loadTable(data);
	}; 
	

	var createMenuRow = function(item, _category) {

		var tableRow = Ti.UI.createTableView({
		});
		
		var titleView = Ti.UI.createView({
			backgroundColor: 'e5eaf0',
			bottom: 1,
			width: (hub.API.app_width - 2),
			right: 1, 
			left: 0,
			borderColor:'#e0e0e0',
			borderWidth:1,
			layout:'horizontal'
		});

		var messageHolder = Ti.UI.createView({
			layout: 'horizontal', 
			top: 3,
			left: 0,
		});
		
		var messageIcon = Ti.UI.createImageView({
			image: item.sender.image_url,
			width: 50, 
			top: 0,
			left: 0,
		});

		var messageTitle = Ti.UI.createView({
			top: 3, 
			left: 2, 
			height: 10,
		});
		
		var messageDetails = Ti.UI.createView({
			top:0,
			left: 5, 
			backgroundColor: 'e5eaf0',
			layout: 'vertical',
		});
		
		messageSenderText = item.sender.name;

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
			text: item.time,
			width: 'auto',
			color: 'black',
			right: 3,
			top: 0,
			font: {
				fontSize: 11
			},
			
		});
		
		messageTitle.add(messageSender, messageTime);
		messageHtml = "<div style = \"font-size:15px\"> <p>" + item.body + "</p></div>";

		var messageContent = Ti.UI.createWebView({
			top:0, 
			backgroundColor: 'e5eaf0',
			width: (hub.API.app_width - 60),
			height: Ti.UI.SIZE,
			html: messageHtml, 
		});

		
		messageDetails.add(messageTitle);
		messageDetails.add(messageContent);
		
		messageHolder.add(messageIcon, messageDetails);
		titleView.add(messageHolder);
		newHeight = 0; 
		var messageLoaded = false; 
		messageContent.addEventListener('load',function(e){
		        newHeight = parseInt(messageContent.evalJS("document.height;")) + 15;
		        messageContent.height = newHeight;
		        messageContent.top = 0; 
		        messageDetails.height = newHeight;  
		        messageDetails.top = 0; 
		        tableRow.height = newHeight;
		});

	
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
	
	function buildMessageView(message_thread){
		
		var self = Ti.UI.createView({
			backgroundColor:hub.API.customBgColor,
			layout: 'vertical', 
		});
		
		var views = [];
		
		self.add(tableHolder); 
		loadTable(message_thread);
		return(self);
	}
	var appWindow = require("ui/common/UserView");
    win = new appWindow();
    self = buildMessageView(message_thread); 
	win.addContent(self);

	var newMessageEvent = function(){
		hub.API.newMessage();
	}
	win.changeRightButtonEvent(newMessageEvent, "new"); 
	thisWindow = win.appwin;
	return thisWindow;
}

module.exports = messageView; 