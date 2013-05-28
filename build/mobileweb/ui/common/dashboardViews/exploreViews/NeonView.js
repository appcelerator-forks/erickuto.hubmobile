hub = require("hub");
var hsf = hub.API.hsf;
var wsf = hub.API.wsf;

function buildNeonView(neonData, _requestType, win){
	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
		layout: 'vertical', 
		table: null
	});
	
	var createFollowBtn = function(neon){
	
		var followIconPath = 'little_' + neon.followWidget.text + '_star.png';

		var followBtn = Titanium.UI.createView({
			top:5,
			width: 140*wsf,
			height:50*hsf,
			right: 10,
			borderRadius:1,
			neon: neon, 
			star: "", 
			label: "", 
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:5,
			borderWidth:1,
			backgroundColor:hub.API.hubDarkBlue, 
			layout: "horizontal", 
		});
		
		followStar = Ti.UI.createImageView({
			top: 5, 
			left: 5,
			width: 40*wsf, 
			touchEnabled: false,
			image: hub.API.imagePath(followIconPath, 2),
		});
		
		followLabel = Ti.UI.createLabel({
			top:5,
			left: 5,
			font: { fontSize: 19*hsf },
			touchEnabled: false,
			text: neon.followWidget.text, 
			color: "#FFFFFF",
		});
		followBtn.star = followStar; 
		followBtn.label = followLabel; 
		
		followBtn.add(followStar);
		followBtn.add(followLabel);
		
		
		followBtn.addEventListener('click', function(e){
			var neon = e.source.neon;
			var neonAnnouncement = neon.followWidget.text + "ing " + neon.activityType + "..."; 
			var followWidget = {
				start: function(){
					win.showIndicator(neonAnnouncement);
				},
				error: function(){
					Ti.API.info("Error " + neonAnnouncement);
					win.hideIndicator(); 
				},
				success: function(neon){
					win.hideIndicator();
					neon = e.source.neon; 
					status = neon.followWidget.state;
					newStatus = status.charAt(0).toUpperCase() + status.slice(1); 
					
					text = neon.followWidget.text; 
					newText = text.charAt(0).toLowerCase() + text.slice(1);
					
					neon.followWidget.text = newStatus; 
					neon.followWidget.status = newText; 
					
					e.source.neon = neon; 
					
					followIconPath = 'little_' + newStatus + '_star.png';
					e.source.label.text = newStatus; 
					e.source.star.image = hub.API.imagePath(followIconPath, 2);
				}
			}; 
			hub.API.followItem(neon.followWidget.text, neon.neonUrl, followWidget);
		});
		return followBtn; 
	}
	
	
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
		var tableHasChild = true; 

		var tableRow = Ti.UI.createTableViewRow({
			className: 'itemRow',
			hasChild: tableHasChild, 
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
			top: 20,
			font: {
				fontSize: 18*hsf
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
		font: {fontSize: 20*hsf},
		text: neonData.neon.activityType, 
	});
	
	neonTopBar.add(neonType);
	
	rows.push(addRowView(neonTopBar));
	
	var toggleFollow = function(neon){
		var followButton = createFollowBtn(neonData.neon); 
		neonTopBar.add(followButton);
	}
	
	toggleFollow(neonData.neon);
	/*
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
	
	var neonComments = neon.commentsData; 
	
	rows.push(addRowView(neonBanner));
	if (neonData.neon.showExpiryDate){
		rows.push(addRowView(contentLocation)); 
	}

	rows.push(addMenuRow(neonData, "Details")); 
	if (neonTags.length > 0){
		rows.push(addMenuRow(neonData, "Tags", neonTags.length)); 
	}
	
	if (neonComments.length > 0){
		rows.push(addMenuRow(neonData, "Comments", neonComments.length)); 
	}
	
	*/
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