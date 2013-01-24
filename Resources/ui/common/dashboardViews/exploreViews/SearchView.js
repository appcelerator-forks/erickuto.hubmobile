var utilities = require("ui/common/utilities");
var util = new utilities();
var hsf = util.height_scale_factor;
var wsf = util.width_scale_factor;
var appWidth = util.app_width; 
var iconWidth = appWidth/5; 
var margin_offset = (util.app_width-350*wsf)/2;
var all_activity_offset = 0; 
var select_activity_offset = 30; 
var user = Ti.App.user; 
var selectedIconColor = '275378'; 
var unselectedIconColor = 'f1f2f6'; 

var icons = []; 

var titleLabel = Ti.UI.createLabel({
		top:3,
		text: "", 
		color: util.customTextColor,
		height: 20,
		font: {
			fontWeight: 'bold',
			fontSize: 18,
		},
		left: 5,
	})
var loadResults = function(_category){
	//Change the icons
	for (var i = 0; i < icons.length; i++){
		
		if (icons[i].category === _category){
			titleLabel.text = _category.charAt(0).toUpperCase() + _category.slice(1);
			//Change the background of the icon
			icons[i].children[0].backgroundColor = selectedIconColor; 
			//Change the image of the icon
			icons[i].children[0].children[0].image = util.imagePath('search_' + _category + '_selected.png');
			//Change the color of the background of the ticker
			icons[i].children[1].backgroundColor = unselectedIconColor; 
			//Change the color of the text of the ticker
			icons[i].children[1].color = selectedIconColor; 
		
			icons[i].status = "selected";
			
		}
		//Unselect the other icon
		else if (icons[i].status === "selected"){
			//Change the background of the icon
			icons[i].children[0].backgroundColor = unselectedIconColor; 
			//Change the image of the icon
			icons[i].children[0].children[0].image = util.imagePath('search_' + icons[i].category + '_unselected.png');
			//Change the color of the background of the ticker
			icons[i].children[1].backgroundColor = selectedIconColor; 
			//Change the color of the text of the ticker
			icons[i].children[1].color = unselectedIconColor; 
			
			icons[i].status = "unselected";

		}
	}
	Ti.API.info("Switching to " + _category);
	//Change the title
	
	//Change the results
	
}; 

var createSearchIcon = function(_status, _iconName, _amount){
	var iconColor = unselectedIconColor; 
	var tickerColor = selectedIconColor; 
	var	textColor = unselectedIconColor; 
	var imageName = 'search_' + _iconName + '_' + _status + '.png'; 
	
	if (_status === "selected"){
		iconColor = selectedIconColor; 
		tickerColor = unselectedIconColor; 
		textColor = selectedIconColor; 
	}
	canvas = Ti.UI.createView({
		top:5, 
		height: 40,
		width: iconWidth, 
	});
	
	canvas.category = _iconName; 
	canvas.status = _status; 
	
	icon = Ti.UI.createView({
		top:8, 
		height: 30,
		width: iconWidth - 10, 
		left: 5,  
		backgroundColor: iconColor,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
		borderColor:'#e0e0e0',
		borderRadius:7,
	});
	
	var imageView = Ti.UI.createImageView({
		image: util.imagePath(imageName),
		height: 30, 
		width: 30, 
		left: 7,
		top: 1,
	});
	
	icon.add(imageView);
	
	ticker = Ti.UI.createLabel({
		top:0, 
		height: 20, 
		width: 30, 
		right: 0, 
		font: {
			fontSize: 11, 
			fontWeight: 'bold',
		},
		color: textColor,
		text: ' ' + _amount,
		backgroundColor: tickerColor, 
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
		borderColor:'#e0e0e0',
		borderRadius:7,
	});
	canvas.add(icon);
	canvas.add(ticker);
	canvas.addEventListener('click', function(event){
		loadResults(_iconName);
	});
	return canvas; 
}

var createMenuRow = function(item) {
	var category = item.split(" ")[0].toLowerCase();
	var selectedSize = user.getSelectedSize(category);
	var tableRow = Ti.UI.createTableViewRow({
		className: 'itemRow',
		category: category,
		hasChild: true, 
		
	});

	var titleView = Ti.UI.createView({
		backgroundColor: 'e5eaf0',
		bottom: 5,
		height: 40,
		width: (util.app_width - 10),
		right: 5, 
		left: 5,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
		borderColor:'#e0e0e0',
		borderRadius:5,
		borderWidth:1,
		layout:'horizontal'
	});
	
	var titleLabel = Ti.UI.createLabel({
		text: item,
		width: 'auto',
		color: '#5e656a',
		left: 5,
		top: 10,
		font: {
			fontSize: 16
		},
		
	});

	var sizeText = "";
	if (selectedSize > 0){
		sizeText = "(" + selectedSize + ")";
	}
	var sizeLabel = Ti.UI.createLabel({
		text: sizeText, 
		color: '#5e656a',
		width: 'auto',
		left: 5,
		top: 10,
		font: {
			fontSize: 16
		},
	});
	
	tableRow.sizeLabel = sizeLabel; 
	titleView.add(titleLabel);
	titleView.add(sizeLabel);
	tableRow.add(titleView);
	tableRow.addEventListener('click', function(e) {
		tableRow.fireEvent('filterExploration', { category: category });
	});
	return tableRow;
};

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
//Master View Component Constructor

function SearchView(_authToken){

	var appWindow = require("ui/common/UserView");
    win = new appWindow();

	var self = Ti.UI.createView({
		backgroundColor:util.customBgColor,
		layout: 'vertical'
	});

	var nonScrollView = Ti.UI.createView({
		top: 3,
		height: 140, 
		layout:'vertical'
	});
	
	var iconsView = Ti.UI.createView({
		top:0,
		height: 50, 
		backgroundColor: util.customBgColor, 
		layout:'horizontal'
	});
	
	var iconNames = ['people', 'offers', 'needs', 'events', 'ideas'];
	
	for (var i = 0; i < iconNames.length; i++){
		icons.push(createSearchIcon('unselected', iconNames[i], Math.floor(Math.random() * 101)));
		iconsView.add(icons[i]);
	}
	
	loadResults('offers');
	
	var sortView = Ti.UI.createView({
		top: 5,
		height: 40,  
		layout:'horizontal', 
		backgroundColor: 'ebebeb',
		borderWidth: 1, 
		borderColor: 'd7dbde',
	});
	
	var titleView = Ti.UI.createView({
		top: 0, 
		height: 30, 
		layout:'horizontal', 
		borderColor: 'd7dbde',
		borderWidth: 1,
	});
	self.add(nonScrollView);
	
	sortView.add(Ti.UI.createLabel({
		top:3,
		text: "Sort by:", 
		color: util.customTextColor,
		height: 30,
		font: {
			fontWeight: 'bold',
			fontSize: 19,
		},
		left: 5,
	}));
	
	var mostRecent = Ti.UI.createLabel({
		top:3,
		text: "Most Recent", 
		color: 'blue',
		height: 30,
		font: {
			fontWeight: 'bold',
			fontSize: 16,
		},
		left: 5,
	});
	
	sortView.add(mostRecent);
	
	sortView.add(Ti.UI.createLabel({
		top:3,
		text: " | ", 
		color: util.customTextColor,
		height: 30,
		font: {
			fontWeight: 'bold',
			fontSize: 18,
		},
		left: 5,
	}));
	
	var mostFollowed = Ti.UI.createLabel({
		top:3,
		text: "Most Followed", 
		color: util.customTextColor,
		height: 30,
		font: {
			fontSize: 16,
		},
		left: 5,
	});
	
	
	sortView.add(mostFollowed);
	titleView.add(titleLabel);
	
	nonScrollView.add(iconsView, sortView, titleView);
	var views = [];
	
	var table = Ti.UI.createTableView({
		top:0,
		separatorColor: 'transparent',
		backgroundColor:util.customBgColor,
	});

	self.add(table);

	var data = [];
	data.push("People");
	data.push("Communities");
	data.push("Groups");
	data.push("Countries of Work");
	data.push("Cities of Work");
	data.push("Fields of Work");
	data.push("Target Populations");
	data.push("Free Tags");
	var rows = [];
	for (var i = 0; i < data.length; i++) {
		rows.push(createMenuRow(data[i]));
	}
	
	table.setData(rows);

	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
	}	
module.exports = SearchView;