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
		height: 100, 
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
	
	userDetailHolder.add(userName, userType, userDesignation);
	
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
	if (user_languages != ""){
		userDetailHolder.add(contentLanguages);
	}
	if (user_location != ""){
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
	
	
	follow_button_text = user.userMetaData.followWidget.text; 
	
	var followBtn = Titanium.UI.createView({
		top:5,
		width: 150*wsf,
		layout:"horizontal",
		height:50*hsf,
		left:10,
		borderRadius:8,
		borderWidth:1,
		backgroundColor:hub.API.hubDarkBlue
	});
	
	followBtn.add(Ti.UI.createImageView({
		top: 5, 
		left: 5,
		width: 40*wsf, 
		image: hub.API.imagePath('little_follow_star.png'),
	}));
	
	followBtn.add(Ti.UI.createLabel({
		top:5,
		left: 5,
		font: { fontSize: 14, },
		text:follow_button_text,
		color: "#FFFFFF",
	}));
	
	tagsView = Ti.UI.createView({
		layout: "horizontal",
		height: "auto",
	});
	
	var userTags = user.userMetaData.allTagsData; 
	
	var createTag = function(tagText){
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
		var tagX = Ti.UI.createImageView({
			top:0,
			height: 20, 
			width: 20, 
			image:hub.API.imagePath('delete.png'),
		});
		tagHolder.add(tagX);
		tagHolder.addEventListener('click', function(e){
			Ti.API.info(tagText);
		})
		var tagTextLabel = Ti.UI.createLabel({
			left: 3, 
			text: tagText, 
			font: {
				fontSize: 15,
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
		tagView.add(tagTextLabel, tagHolder);
		return tagView; 
	}
	
	
	for (var i = 0; i < userTags.length; i++){
		tagsView.add(createTag(userTags[i].name)); 
	}
	
	rows.push(addRowView(userBanner));
	rows.push(addRowView(userContentHolder));
	rows.push(addRowView(sendMessageBtn));
	rows.push(addRowView(followBtn));
	rows.push(addRowView(tagsView));
	
	
	table.setData(rows);
	
	self.add(table);
	
	return self; 
}

function userView(user){
	var appWindow = require("ui/common/UserView");
    win = new appWindow("Explore");
    self = buildUserView(user); 
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
}

module.exports = userView; 