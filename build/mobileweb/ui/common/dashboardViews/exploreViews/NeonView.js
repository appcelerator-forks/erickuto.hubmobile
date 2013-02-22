function buildNeonView(neon){
	var self = Ti.UI.createView({
		backgroundColor:hubAPI.customBgColor,
		layout: 'vertical', 
		table: null
	});
	var neonBanner = Ti.UI.createView({
		top: 0, 
		height: 100, 
		layout: "horizontal"
	});
	
	var neonImage = Ti.UI.createImageView({
		image: neon.avatarUrl,
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
	
	var neonType = Ti.UI.createLabel({
		top: 0,
		height: 20,  
		left: 0, 
		font: {fontSize: 14},
		text: neon.activityType, 
	});
	neon_name = ""; 
	detail_category = "";
	detail_location = ""; 
	neon_title_location = ""; 	
	var neonDetailHtml = ""; 
	if (neon.activityType === "Person"){
		neon_name = neon.displayName;
		neon_title_location = "Location"; 
		detail_category = neon.userType; 
		detail_location = neon.country; 
		neonDetailHtml = neon.truncatedDescriptionFormatted; 
	}
	else{
		neon_name = neon.neonTitle; 
		neon_title_location = "Expires: ";  
		detail_category = neon.creatorDisplayName + " (" + neon.creatorUserType + ", " + neon.creatorCountry + ")"; 
		detail_location = neon.expiresAt; 
		neonDetailHtml = neon.truncatedNeonDescriptionFormatted; 
	}
	var neonName = Ti.UI.createLabel({
		top: 0, 
		height: 40, 
		left: 0, 
		font: {fontSize: 14},
		text: neon_name, 
	});
	
	var neonDetailCategory = Ti.UI.createLabel({
		top: 0, 
		height: 30, 
		left: 0, 
		font: {fontSize: 14},
		text: detail_category, 
	});
	
	neonDetailHolder.add(neonType, neonName, neonDetailCategory);
	
	var neonContentHolder = Ti.UI.createView({
		top: 0, 
		layout: "vertical"
	});
	
	var contentLocation = Ti.UI.createView({
		top: 0, 
		height: 30, 
		layout: "horizontal", 
	});
	
	var neonTitleLocation = Ti.UI.createLabel({
		top: 0, 
		left: 5, 
		font: {fontSize: 14},
		text: neon_title_location, 
	});
	var neonDetailLocation = Ti.UI.createLabel({
		top: 0, 
		left: 5, 
		font: {fontSize: 14},
		text: detail_location, 
	});
	
	contentLocation.add(neonTitleLocation, neonDetailLocation);
	
	Ti.API.info(neonDetailHtml);
	if (neonDetailHtml && neonDetailHtml != "<p></p>"){
		neonDetailHtml = "<div style = \"font-size:14px\">" + neonDetailHtml + "</div>"
	}else{
		neonDetailHtml = "<p></p>"; 
	}
	
	var neonDetailSummary = Ti.UI.createWebView({
			top: 0, 
			html: neonDetailHtml, 
		});
	neonContentHolder.add(contentLocation, neonDetailSummary);
	
	self.add(neonBanner, neonContentHolder);
	
	return self; 
}
function neonView(neon){
	var appWindow = require("ui/common/UserView");
    win = new appWindow();
    self = buildNeonView(neon); 
	Ti.API.info(neon);
	win.addContent(self);
	win.addOnCloseEvent('refreshSearchResults');
	thisWindow = win.appwin;
	return thisWindow;
}

module.exports = neonView; 