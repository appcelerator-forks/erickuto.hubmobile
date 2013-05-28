hub = require("hub");
var hsf = hub.API.hsf;
var wsf = hub.API.wsf;

function buildUserView(user){
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
	
	userDetailHolder.add(userName, userType);
	
	if (user.userData.designation != "" && user.userData.designation != null){
		userDetailHolder.add(userDesignation);
	}
	var userContentHolder = Ti.UI.createView({
		top: 0, 
		height: 300*hsf,
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
	var userDetailHtml = user.userData.about; 
	
	if (userDetailHtml && userDetailHtml != "<p></p>"){
		userDetailHtml = "<div style = \"font-size:14px\">" + userDetailHtml + "</div>"
	}else{
		userDetailHtml = "<p></p>"; 
	}
	
	var userDetailSummary = Ti.UI.createWebView({
			top: 0, 
			html: userDetailHtml, 
		});
		
	userContentHolder.add(userDetailSummary);
	
	var sendMessageBtn = Titanium.UI.createView({
		top:5,
		height:60*hsf,
		width: 250*wsf,
		left:10,
		borderRadius:8,
		borderWidth:1,
		layout:"horizontal",
		backgroundColor:hub.API.hubDarkBlue,
	});
	
	send_message_text = "Send " + user.userData.first_name + " a message";
	
	sendMessageBtn.add(Ti.UI.createImageView({
		top: 5, 
		left: 5,
		width: 40*wsf, 
		image: hub.API.imagePath('small_messages_icon.png'),
	}));
	
	sendMessageBtn.add(Ti.UI.createLabel({
		top:5,
		left: 5,
		font: { fontSize: 13, },
		text:send_message_text,
		color: "#FFFFFF",
	}));
	
	
	follow_button_text = user.userMetaData.followWidget.text + " " + user.userData.first_name; 
	
	var followBtn = Titanium.UI.createView({
		top:5,
		width: 200*wsf,
		layout:"horizontal",
		height:50*hsf,
		left:10,
		borderRadius:8,
		borderWidth:1,
		backgroundColor:hub.API.hubDarkBlue
	});
	
	var followIconPath = 'little_' + user.userMetaData.followWidget.text + '_star.png'; 
	followBtn.add(Ti.UI.createImageView({
		top: 5, 
		left: 5,
		width: 40*wsf, 
		image: hub.API.imagePath(followIconPath),
	}));
	
	followBtn.add(Ti.UI.createLabel({
		top:5,
		left: 5,
		font: { fontSize: 13, },
		text:follow_button_text,
		color: "#FFFFFF",
	}));
	
	tagsView = Ti.UI.createView({
		layout: "horizontal",
		height: "auto",
		left: 5
	});
	
	var userTags = user.userMetaData.allTagsData; 
	
	var createTag = function(tag){
		tagText = tag.name; 
		var maxWidth = 200; 
		
		var tagView = Ti.UI.createView({
			left: 5,  
			top: 3, 
			width: 1,
			height: 30,  
			backgroundColor: hub.API.hubDarkBlue, 
			borderWidth: 1,
			borderColor: '#2E2E2E',  
			borderRadius: 5, 
			layout: "horizontal"
		});
		var tagHolder = Ti.UI.createView({
			left: 3, 
			top: 0, 
			width: 30, 
			height: 30,
		});
		var followIconPath = 'little_' + tag.followWidget.text + '_star.png'; 
		followStar = Ti.UI.createImageView({
			top: 5, 
			left: 5,
			width: 40*wsf, 
			image: hub.API.imagePath(followIconPath),
		});
		tagHolder.add(followStar);
		tagHolder.addEventListener('click', function(e){
			Ti.API.info(tagText);
		})
		var tagTextLabel = Ti.UI.createLabel({
			left: 3, 
			text: tagText, 
			font: {
				fontSize: 13,
			},
			width: 'auto',
			color: "#FFFFFF",
			height: 30,
		});
		ttlWidth = tagTextLabel.toImage().width; 
		
		if (ttlWidth > maxWidth){
			ttlWidth = maxWidth; 
		}
		tagTextLabel.width = ttlWidth; 
		
		tagView.width =  ttlWidth + tagHolder.toImage().width + 10; 
		tagView.add(tagHolder,tagTextLabel);
		return tagView; 
	}
	
	
	for (var i = 0; i < userTags.length; i++){
		tagsView.add(createTag(userTags[i])); 
	}
	
	
	var about_text = "About " + user.userData.first_name; 
	var aboutTitle = Ti.UI.createLabel({
		top: 0, 
		left: 5, 
		color: hub.API.customTextColor,
		height: 20,
		font: {
			fontWeight: 'bold',
			fontSize: 15,
		},
		text: about_text,
	});
	
	var tag_title_text = user.userData.first_name + "'s Tags: "; 
	var tagTitleText = Ti.UI.createLabel({
		top: 0, 
		left: 5, 
		color: hub.API.customTextColor,
		height: 20,
		font: {
			fontWeight: 'bold',
			fontSize: 15,
		},
		text: tag_title_text,
	});
	
	rows.push(addRowView(userBanner));
	if (user.userData.about != "" && user.userData.about != null){
		rows.push(addRowView(aboutTitle));
		rows.push(addRowView(userContentHolder));
	}
	
	rows.push(addRowView(sendMessageBtn));
	rows.push(addRowView(followBtn));
	
	if (user.userMetaData.allTagsData.length > 0){
		rows.push(addRowView(tagTitleText));
		rows.push(addRowView(tagsView));
	}

	table.setData(rows);
	
	self.add(table);
	
	return self; 
}

function userView(user, _requestType){
	var appWindow = require("ui/common/UserView");
    win = new appWindow(_requestType);
    self = buildUserView(user); 
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
}

module.exports = userView; 