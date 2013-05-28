hub = require("hub");
var hsf = hub.API.hsf;
var wsf = hub.API.wsf;

function buildNeonView(neonData, _category){
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
	
	var createComment = function(_comment, _size){
		var commentWidth = (hub.API.app_width - 10) - (50*_size); 
		var commentView = Ti.UI.createView({
			width: commentWidth, 
			top: 5,
			height: 1, 
			layout: "horizontal", 
			backgroundColor: hub.API.customBgColor,
		});
		var userImage = Ti.UI.createImageView({
			image: _comment.avatarUrl,
			height: 50, 
			width: 50, 
			left: 1,
			top: 0,
		});
		
		commentBodyWidth = commentWidth - 60; //Subtract 100 for userImage
		var commentBody = Ti.UI.createView({
			width: commentBodyWidth, 
			height: 'auto', 
			layout: "vertical",
			top: 0, 
		});
		
		var commentTopBar = Ti.UI.createView({
			top: 0,
			width: commentBodyWidth, 
			height: 15,
		});
		
		commentTopBar.add(Ti.UI.createLabel({
			top: 0, 
			left: 5, 
			font: {fontSize: 12},
			color: hub.API.hubDarkBlue,
			text: _comment.userName,
		}));
		
		commentTopBar.add(Ti.UI.createLabel({
			top: 0, 
			right: 5, 
			font: {fontSize: 12},
			text: _comment.timeElapsed,
		}));
		
		var commentDetail = hub.API.stripHtml(_comment.body); 
		
		
		var commentDetailSummary = Ti.UI.createLabel({
				top: 0, 
				left: 5,
				width: commentBodyWidth - 5, 
				font: {fontSize: 12},
				text: commentDetail, 
			});
	 	 
	 	var commentReplyBox = Ti.UI.createView({
	 		top: 0, 
	 		left: 5, 
	 		width: commentBodyWidth - 5, 
	 		height: 70,
	 	}); 
	 	
	 	var newComment = Titanium.UI.createTextField({
			top:5,
			width:commentBodyWidth - 10,
			left:0,
			height:25,
			font:{
		      fontSize:12,
		      fontColor:hub.API.util.customTextColor,
		      fontFamily: hub.API.util.customFont
		   },
			hintText:'Post a comment',
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
			borderColor:'#e0e0e0',
			borderRadius:2,
			borderWidth:1,
		});
	 	
	 	var commentButton = Ti.UI.createImageView({
			top: 35, 
			right: 5,
			height: 17, 
			image: hub.API.imagePath('comment_button.png'),
		});
	 	commentReplyBox.add(newComment); 
	 	commentReplyBox.add(commentButton);
		commentBody.add(commentTopBar);
		commentBody.add(commentDetailSummary);
		commentBody.add(commentReplyBox);
		
		/*var childrensTable = Ti.UI.createTableView({
			top:5,
			separatorColor: 'transparent',
			backgroundColor:hub.API.customBgColor,
		});
		var childrenRows = [];
		
		children = _comment.children; 
		for (var i = 0; i < children.length; i++){
			childrenRows.push(addRowView(createComment(children[i], (_size+1))));
		}
		childrensTable.setData(childrenRows);
		commentBody.add(childrensTable);*/
		cbHeight = commentBody.toImage().height; 
		Ti.API.info(cbHeight);
		commentView.height = cbHeight; 
		commentView.add(userImage); 
		
		
		commentView.add(commentBody);
		
		return commentView; 
	}
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
	
	var neonBanner = Ti.UI.createView({
		top: 0, 
		height: 40, 
		layout: "horizontal"
	});
	
	
	var neonDetailHolder = Ti.UI.createView({
		top: 0, 
		left: 5, 
		height: 100, 
		layout: "vertical"
	});
	
	

	var neonDetailHtml = neonData.formattedDescription;

	var neonName = Ti.UI.createLabel({
		top: 0, 
		height: 40, 
		left: 0, 
		font: {fontSize: 14},
		text: neonData.neon.neonTitle, 
	});

	neonDetailHolder.add(neonName);
	neonBanner.add(neonDetailHolder);
	
	
	
	var neonCategory = Ti.UI.createLabel({
		top: 5, 
		left: 5, 
		height: 20, 
		font: {fontSize: 14},
		text: _category, 
	});

	if (neonDetailHtml && neonDetailHtml != "<p></p>"){
		neonDetailHtml = "<div style = \"font-size:14px\">" + neonDetailHtml + "</div>"
	}else{
		neonDetailHtml = "<p></p>"; 
	}
	
	var neonDetailSummary = Ti.UI.createWebView({
			top: 0, 
			height: 'auto',
			html: neonDetailHtml, 
		});
	
	var neonContentHolder = Ti.UI.createView({
		top: 10, 
		height: "auto",
	});
	
	if (_category == "Details"){
		neonContentHolder.add(neonDetailSummary);
	}else if (_category == "Tags"){
		tagsView = Ti.UI.createView({
			layout: "horizontal",
			height: "auto",
			left: 5
		});
		
		var neonTags = neon.allTagsData; 
		for (var i = 0; i < neonTags.length; i++){
			tagsView.add(createTag(neonTags[i])); 
		}
		neonContentHolder.add(tagsView);
	}else{
		var commentsTable = Ti.UI.createTableView({
			top:0,
			separatorColor: 'transparent',
			backgroundColor:hub.API.customBgColor,
		});
		var commentRows = [];
		
		comments = neon.commentsData; 
		for (var i = 0; i < comments.length; i++){
			commentRows.push(addRowView(createComment(comments[i], 0)));
		}
		commentsTable.setData(commentRows);
		neonContentHolder.add(commentsTable);
	}
	
	
	
	
	/*
	
	
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
	*/
	
	var table = Ti.UI.createTableView({
		top:0,
		separatorColor: 'transparent',
		backgroundColor:hub.API.customBgColor,
	});
	
	var rows = [];
	
	rows.push(addRowView(neonBanner));
	rows.push(addRowView(neonCategory )); 
	rows.push(addRowView(neonContentHolder));
	
	/*rows.push(addRowView(tagTitleText));
	rows.push(addRowView(tagsView));
	*/
	
	
	
	/*	
	var menuTable = Ti.UI.createTableView({
		top:0,
		separatorColor: 'transparent',
		backgroundColor:hub.API.customBgColor,
	});
	
	menuRows = []; 
	rows.push(addMenuRow("Details")); 
	rows.push(addMenuRow("Tags")); 
	rows.push(addMenuRow("Comments")); 
	
	/*menuTable.setData(menuRows);

	rows.push(menuTable);
	*/
	table.setData(rows);
	self.add(table);
	
	return self; 
}
function neonView(neonData, _category, _requestType){
	Ti.API.info(_category);
	var appWindow = require("ui/common/UserView");
    win = new appWindow(_requestType);
    self = buildNeonView(neonData, _category); 
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
}

module.exports = neonView; 