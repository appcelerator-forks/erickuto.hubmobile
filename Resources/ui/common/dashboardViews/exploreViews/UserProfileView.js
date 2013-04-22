hub = require("hub");

function buildUserView(user){
	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
		layout: 'vertical', 
	});
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
		layout: "vertical"
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
	Ti.API.info(JSON.stringify(user.languages)); 
	Ti.API.info(user_languages);
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
	
	self.add(userBanner, userContentHolder);
	
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