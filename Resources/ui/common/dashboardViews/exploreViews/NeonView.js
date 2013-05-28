hub = require("hub");
var hsf = hub.API.hsf;
var wsf = hub.API.wsf;

function buildNeonView(neonData, _requestType, win){
	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
		layout: 'vertical', 
		table: null
	});
	
	var addRowView = function(_view) {
		var tablerow = Ti.UI.createTableViewRow({
			hasChild: false,
			touchEnabled: hub.API.getTouchEnabled(),
			selectionStyle: hub.API.getSelectionStyle(), 
			focusable:false,
		});
	
		tablerow.add(_view);
		
		return tablerow;
	};
	
	var addMenuRow = function(neon, _title, _size){

		var tableRow = Ti.UI.createTableViewRow({
			hasChild: true, 
		});
		
		var titleView = Ti.UI.createView({
			backgroundColor: 'e5eaf0',
			bottom: 5,
			height: 50*hsf,
			width: (hub.API.app_width - 10),
			right: 5, 
			left: 5,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:5,
			borderWidth:1,
			layout:'horizontal'
		});
		
		var titleText = _title; 
		if (_size){
			titleText += " (" + _size + ")"; 
		}
		var titleLabel = Ti.UI.createLabel({
			text: titleText,
			width: 'auto',
			color: '#5e656a',
			left: 5,
			top: 10,
			font: {
				fontSize: 22*hsf
			},
			
		});
		
		titleView.add(titleLabel);

		tableRow.add(titleView);
		
		tableRow.addEventListener('click', function(e){
			NeonView = require("ui/common/dashboardViews/exploreViews/NeonDetailsView");
			var neonView = new NeonView(neon, _title, _requestType); 
			hub.API.openWindow(neonView);
		});	
		return tableRow;
	}
	
	var table = Ti.UI.createTableView({
		top:0,
		separatorColor: 'transparent',
		backgroundColor:hub.API.customBgColor,
	});
	
	var rows = []; 
	
	var neonTopBar = Ti.UI.createView({
		top: 0, 
		height: 60*hsf,
		width: hub.API.app_width - 10, 
	});
	
	var neonType = Ti.UI.createLabel({
		top: 0,
		height: 40*hsf,  
		left: 10, 
		font: {fontSize: 23*hsf},
		text: neonData.neon.activityType, 
	});
	
	neonTopBar.add(neonType);
	
	rows.push(addRowView(neonTopBar));
	

	var followButton = hub.API.createFollowBtn(neonData.neon); 
	neonTopBar.add(followButton);

	
	var neonBanner = Ti.UI.createView({
		top: 0, 
		height: 100, 
		layout: "horizontal"
	});
	
	var neonImage = Ti.UI.createImageView({
		image: neonData.neon.avatarUrl,
		height: 100, 
		width: 100, 
		left: 1,
		top: 1,
	});
	
	var neonDetailHolder = Ti.UI.createView({
		top: 0, 
		left: 5, 
		height: 100, 
		layout: "vertical"
	});
	
	neonBanner.add(neonImage, neonDetailHolder);
	
	detail_location = ""; 

	detail_category = neonData.neon.creatorDisplayName + " (" + neonData.neon.creatorUserType + ", " + neonData.neon.creatorCountry + ")"; 
	
	var neonName = Ti.UI.createLabel({
		top: 0, 
		height: 40, 
		left: 0, 
		font: {fontSize: 14},
		text: neonData.neon.neonTitle, 
	});
	
	var neonDetailCategory = Ti.UI.createLabel({
		top: 0, 
		height: 40, 
		left: 0, 
		font: {fontSize: 14},
		text: detail_category, 
	});
	
	neonDetailHolder.add(neonName, neonDetailCategory);
	
	rows.push(addRowView(neonBanner));
	
	var contentLocation = Ti.UI.createView({
		top: 0, 
		height: 30, 
		layout: "horizontal", 
	});
	
	var neonTitleLocation = Ti.UI.createLabel({
		top: 0, 
		left: 5, 
		font: {fontSize: 14},
		text: "Expires :", 
	});
	var neonDetailLocation = Ti.UI.createLabel({
		top: 0, 
		left: 5, 
		font: {fontSize: 14},
		text: neonData.neon.expiresAt, 
	});
	
	contentLocation.add(neonTitleLocation, neonDetailLocation);
		
	if (neonData.neon.showExpiryDate){
		rows.push(addRowView(contentLocation)); 
	}
	
	var separatorView = Ti.UI.createView({
		height: 5*hsf, 
		backgroundColor:hub.API.customBgColor,
	});
	
	rows.push(addRowView(separatorView));
	
	rows.push(addMenuRow(neonData, "Details")); 
	
	
	
	var neonTags = neonData.neon.allTagsData; 
	var neonComments = neonData.neon.commentsData; 
		
	if (neonTags.length > 0){
		rows.push(addRowView(separatorView));
		rows.push(addMenuRow(neonData, "Tags", neonTags.length)); 
	}
	
	if (neonComments.length > 0){
		rows.push(addRowView(separatorView));
		rows.push(addMenuRow(neonData, "Comments", neonComments.length)); 
	}

	table.setData(rows);
	self.add(table);
	
	return self; 
}
function neonView(neonData, _requestType){
	var appWindow = require("ui/common/UserView");
    win = new appWindow(_requestType);

    self = buildNeonView(neonData, _requestType, win); 
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
}

module.exports = neonView; 