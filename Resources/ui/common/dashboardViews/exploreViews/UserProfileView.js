hub = require("hub");
var hsf = hub.API.hsf;
var wsf = hub.API.wsf;

function buildUserView(user, _requestType){
	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
		layout: 'vertical', 
	});
	
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
	
	var addMenuRow = function(user, _title, _size){

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
			UserDetailsView = require("ui/common/dashboardViews/exploreViews/UserDetailsView");
			var UserDetailsView = new UserDetailsView(user, _title, _requestType); 
			hub.API.openWindow(UserDetailsView);
		});	
		return tableRow;
	}
	var table = Ti.UI.createTableView({
		top:0,
		separatorColor: 'transparent',
		backgroundColor:hub.API.customBgColor,
	});
	
	var rows = []; 

	var userBanner = Ti.UI.createView({
		top: 0, 
		height: 100, 
		layout: "horizontal"
	});
	
	var userImage = Ti.UI.createImageView({
		image: user.userMetaData.avatarUrl,
		height: 100, 
		width: 100, 
		left: 1,
		top: 1,
	});
	
	var userDetailHolder = Ti.UI.createView({
		top: 0, 
		left: 5, 
		//height: 100, 
		layout: "vertical"
	});

	userBanner.add(userImage, userDetailHolder);

	var userName = Ti.UI.createLabel({
		top: 0, 
		height: 20, 
		left: 0, 
		font: {fontSize: 14},
		text: user.userMetaData.displayName, 
	});
	
	var userType = Ti.UI.createLabel({
		top: 0, 
		height: 20, 
		left: 0, 
		font: {fontSize: 14},
		text: user.userMetaData.userType, 
	});
	
	var userDesignation = Ti.UI.createLabel({
		top: 0, 
		height: 20, 
		left: 0, 
		font: {fontSize: 14},
		text: user.userData.designation, 
	});
	
	var electionDate = Ti.UI.createLabel({
		top: 0, 
		height: 20, 
		left: 0, 
		font: {fontSize: 14},
		text: user.userData.election_date, 
	});
	userDetailHolder.add(userName, userType);
	
	if (user.userData.designation != "" && user.userData.designation != null){
		userDetailHolder.add(userDesignation);
	}
	if (user.userData.election_date != "" && user.userData.election_date != null){
		electionDate.text = "Since " + user.userData.election_date; 
		userDetailHolder.add(electionDate);
	}
	
	var userContentHolder = Ti.UI.createView({
		top: 0, 
		layout: "vertical",
	});
	
	var contentLocation = Ti.UI.createView({
		top: 0, 
		height: 20, 
		layout: "horizontal", 
	});
	
	var userTitleLocation = Ti.UI.createLabel({
		top: 0, 
		left: 0, 
		font: {fontSize: 14},
		text: "Located In:", 
	});
	
	var user_location = ""; 
	if (user.userData.city != null){
		user_location += user.userData.city; 
	} 
	
	if (user.userData.country != null){
		if (user.userData.city != null){
			user_location += " , "; 
		} 
		user_location += user.userData.country; 
	} 
	
	var userDetailLocation = Ti.UI.createLabel({
		top: 0, 
		left: 0, 
		font: {fontSize: 14},
		text: user_location, 
	});
	
	contentLocation.add(userTitleLocation, userDetailLocation);
	
	var contentLanguages = Ti.UI.createView({
		top: 0, 
		height: 20, 
		layout: "horizontal", 
	});
	
	var userTitleLanguages = Ti.UI.createLabel({
		top: 0, 
		left: 0, 
		font: {fontSize: 14},
		text: "Languages:", 
	});
	
	var user_languages = ""; 

	for (i = 0; i < user.languages.length; i++){
		user_languages += user.languages[i].name; 
		if (i != user.languages.length - 1){
		user_languages += ", "; 
		}
	}

	var userDetailLanguages = Ti.UI.createLabel({
		top: 0, 
		left: 0, 
		font: {fontSize: 14},
		text: user_languages, 
	});
	
	contentLanguages.add(userTitleLanguages, userDetailLanguages);
	if (user_languages != "" && user_languages != null){
		userDetailHolder.add(contentLanguages);
	}
	if (user_location != "" && user_location != null){
		userDetailHolder.add(contentLocation);
	}

	var sendMessageBtn = Titanium.UI.createView({
		top:5,
		height:50*hsf,
		width: 140*wsf,
		left:10,
		borderRadius:8,
		borderWidth:1,
		layout:"horizontal",
		backgroundColor:hub.API.hubDarkBlue,
	});
	
	sendMessageBtn.add(Ti.UI.createImageView({
		top: 5, 
		left: 5,
		width: 40*wsf, 
		image: hub.API.imagePath('small_messages_icon.png'),
	}));
	
	sendMessageBtn.add(Ti.UI.createLabel({
		top:5,
		left: 0,
		font: { fontSize: 13, },
		text:"Message",
		color: "#FFFFFF",
	}));
	
	var followBtn = hub.API.createFollowBtn(user.userMetaData); 

	rows.push(addRowView(userBanner));

	var userTopBar = Ti.UI.createView({
		top: 0, 
		height: 60*hsf,
		width: hub.API.app_width - 10, 
	});
	
	var separatorView = Ti.UI.createView({
		height: 5*hsf, 
		backgroundColor:hub.API.customBgColor,
	});
	
	userTopBar.add(sendMessageBtn, followBtn);
	
	rows.push(addRowView(userTopBar));
	
	rows.push(addRowView(separatorView));
	
	var menuRowOptions = ["About Me","Offers", "Needs", "Events", "News"]; 
	
	for (var i = 0; i < menuRowOptions.length; i++){
		rows.push(addMenuRow(user, menuRowOptions[i]));
	}
	 
	var userTags = user.userMetaData.allTagsData; 
		
	if (userTags.length > 0){
		rows.push(addRowView(separatorView));
		rows.push(addMenuRow(user, "Tags", userTags.length)); 
	}
	
	var userTags = user.userMetaData.allTagsData; 
		
	if (userTags.length > 0){
		rows.push(addRowView(separatorView));
		rows.push(addMenuRow(user.userMetaData, "Tags", userTags.length)); 
		rows.push(addRowView(separatorView));
	}

	table.setData(rows);
	
	self.add(table);
	
	return self; 
}

function userView(user, _requestType){
	var appWindow = require("ui/common/UserView");
    win = new appWindow(_requestType);
    self = buildUserView(user, _requestType); 
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
}

module.exports = userView; 