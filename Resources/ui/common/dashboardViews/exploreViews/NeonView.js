hub = require("hub");
var hsf = hub.API.hsf;
var wsf = hub.API.wsf;

function buildNeonView(neonData){
	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
		layout: 'vertical', 
		table: null
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
	
	tagsView = Ti.UI.createView({
		layout: "horizontal",
		height: "auto",
		left: 5
	});
	
	var neonTags = neon.allTagsData; 
	
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
	
	
	for (var i = 0; i < neonTags.length; i++){
		tagsView.add(createTag(neonTags[i])); 
	}
	
	var tag_title_text = "Tags: "; 
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
	
	rows.push(addRowView(neonBanner));
	rows.push(addRowView(neonContentHolder));
	rows.push(addRowView(tagTitleText));
	rows.push(addRowView(tagsView));
	
	table.setData(rows);
	
	self.add(table);
	
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