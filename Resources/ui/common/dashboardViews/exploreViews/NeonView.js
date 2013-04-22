hub = require("hub");

function buildNeonView(neonData){
	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
		layout: 'vertical', 
		table: null
	});
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
	
	var neonType = Ti.UI.createLabel({
		top: 0,
		height: 20,  
		left: 0, 
		font: {fontSize: 14},
		text: neonData.neon.activityType, 
	});

	
	detail_location = ""; 
	var neonDetailHtml = neonData.formattedDescription;

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
		text: "Expires :", 
	});
	var neonDetailLocation = Ti.UI.createLabel({
		top: 0, 
		left: 5, 
		font: {fontSize: 14},
		text: neonData.neon.expiresAt, 
	});
	
	contentLocation.add(neonTitleLocation, neonDetailLocation);
	
	if (neonDetailHtml && neonDetailHtml != "<p></p>"){
		neonDetailHtml = "<div style = \"font-size:14px\">" + neonDetailHtml + "</div>"
	}else{
		neonDetailHtml = "<p></p>"; 
	}
	
	var neonDetailSummary = Ti.UI.createWebView({
			top: 0, 
			html: neonDetailHtml, 
		});
		
	if (neonData.neon.showExpiryDate){
		neonContentHolder.add(contentLocation); 
	}
	neonContentHolder.add(neonDetailSummary);
	
	self.add(neonBanner, neonContentHolder);
	
	return self; 
}
function neonView(neonData){
	var appWindow = require("ui/common/UserView");
    win = new appWindow("Explore");
    self = buildNeonView(neonData); 
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
}

module.exports = neonView; 