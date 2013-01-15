var createMenuRow = function(item) {
	var tablerow = Ti.UI.createTableViewRow({
		height: 40,
		className: 'itemRow',
		hasChild: true
	});

	var titleview = Ti.UI.createLabel({
		text: item,
		color: '#000',
		height: 30,
		font: {
			fontSize: 16
		},
		left: 5,
	});

	tablerow.add(titleview);
	
	return tablerow;
};

var addRowView = function(_view) {
	var tablerow = Ti.UI.createTableViewRow({
		hasChild: false
	});

	tablerow.add(_view);
	
	return tablerow;
};
//Master View Component Constructor

function ExploreView(_authToken){
	
	var utilities = require("ui/common/utilities");
	var util = new utilities();
	var hsf = util.height_scale_factor;
	var wsf = util.width_scale_factor;
	var margin_offset = (util.app_width-350*wsf)/2;
	
	var appWindow = require("ui/common/UserView");
    win = new appWindow();

	var self = Ti.UI.createView({
		backgroundColor:'#fff'
	});
	var scrollView = Ti.UI.createView({
		top:5
	});
	
	var allActivities = Ti.UI.createLabel({
		top:5,
		text: "All Activity", 
		color: 'black',
		height: 30,
		font: {
			fontSize: 18
		},
		left: 25,
	});
	
	var selectActivities = Ti.UI.createLabel({
		top:35,
		text: "Activities I follow", 
		color: 'black',
		height: 30,
		font: {
			fontSize: 18
		},
		left: 25,
	});
	
	var filterBy = Ti.UI.createLabel({
		top:75,
		text: "Filter by:", 
		color: 'black',
		height: 30,
		font: {
			fontSize: 20
		},
		left: 5,
	});
	scrollView.add(allActivities);
	
	var searchBtn = Titanium.UI.createButton({
		top:5,
		width:150*wsf,
		height:75*hsf,
		right:10,
		borderRadius:1,
		backgroundImage:util.imagePath('search_button.png'),
	});
	
	var searchBar = Ti.UI.createSearchBar({
		top:0,
		hintText:"Explore Hub",
		//width:350*wsf,
	});
	scrollView.add(searchBar);
	var staticView = Ti.UI.createView();
	staticView.add(allActivities);
	staticView.add(selectActivities);
	staticView.add(filterBy);
	var table = Ti.UI.createTableView({
		top:50
	});
	self.add(table);
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', { link: e.row.link });
	});
	
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
	rows.push(addRowView(staticView));
	for (var i = 0; i < data.length; i++) {
		rows.push(createMenuRow(data[i]));
	}
	rows.push(addRowView(searchBtn));
	table.setData(rows);
	scrollView.add(table);
	win.addContent(scrollView);
	thisWindow = win.appwin;
	return thisWindow;
	}	
module.exports = ExploreView;