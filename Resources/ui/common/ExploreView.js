var utilities = require("ui/common/utilities");
var util = new utilities();
var hsf = util.height_scale_factor;
var wsf = util.width_scale_factor;
var margin_offset = (util.app_width-350*wsf)/2;
var all_activity_offset = 0; 
var select_activity_offset = 30; 

var selectedRadio = Titanium.UI.createButton({
	top:0, 
	left:0,
	width:40,
	height:40,
	borderRadius:1,
	action:'unselect',
	activity:'all',
	backgroundImage:util.imagePath('radio_selected.png'),
});

var radioAction = function(e){
	var action = e.source.action;
	var activity = e.source.activity; 
	
	Ti.API.info(action + "ing " + activity);
	
	if (action === 'unselect'){
		if (activity === 'all'){
			activity = 'select';
		}
		else{
			activity = 'all';
		}
	}
	
	selectActivity(activity);
};

selectedRadio.addEventListener('click', radioAction);

var staticView = Ti.UI.createView({
	top:0,
});
	
var unselectedRadio = Titanium.UI.createButton({
	top:30, 
	left:0,
	width:40,
	height:40,
	borderRadius:1,
	action:'select',
	activity: 'select',
	backgroundImage:util.imagePath('radio_unselected.png'),
});

unselectedRadio.addEventListener('click', radioAction);

var createMenuRow = function(item) {
	var tablerow = Ti.UI.createTableViewRow({
		className: 'itemRow',
		hasChild: true, 
		
	});

	var titleView = Ti.UI.createView({
		backgroundColor: 'e5eaf0',
		top: 5, 
		bottom: 5,
		height: 40,
		width: (util.app_width - 10),
		right: 5, 
		left: 5,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
		borderColor:'#e0e0e0',
		borderRadius:5,
		borderWidth:1,
	});
	
	var titleLabel = Ti.UI.createLabel({
		text: item,
		color: '#5e656a',
		left: 5,
		font: {
			fontSize: 16
		},
		
	});

	titleView.add(titleLabel);
	tablerow.add(titleView);
	
	return tablerow;
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

function selectActivity(_activity){
	/*staticView.remove(selectedRadio);
	staticView.remove(unselectedRadio);*/

	if(_activity === "all"){
		selectedRadio.top = all_activity_offset;
		unselectedRadio.top = select_activity_offset;
		selectedRadio.activity = "all";
		unselectedRadio.activity = "select";
	}
	else{
		selectedRadio.top = select_activity_offset;
		unselectedRadio.top = all_activity_offset;
		selectedRadio.activity = "select";
		unselectedRadio.activity = "all";
	}
	Ti.API.info("Choosing.. " + _activity);
	staticView.add(selectedRadio);
	staticView.add(unselectedRadio);
}
function ExploreView(_authToken){

	var appWindow = require("ui/common/UserView");
    win = new appWindow();

	var self = Ti.UI.createView({
		backgroundColor:util.customBgColor,
	});
	
	var nonScrollView = Ti.UI.createView({
	});
	var searchBar = Ti.UI.createSearchBar({
		top:0,
		hintText:"Explore Hub",
		barColor: '#f6f6f6',
		//width:350*wsf,
	});
	nonScrollView.add(searchBar);
	self.add(nonScrollView);
	
	var allActivities = Ti.UI.createLabel({
		top:5,
		text: "All Activity", 
		color: util.customTextColor,
		height: 30,
		font: {
			fontSize: 18
		},
		left: 35,
	});
	
	var selectActivities = Ti.UI.createLabel({
		top:35,
		text: "Activity I follow", 
		color: util.customTextColor,
		height: 30,
		font: {
			fontSize: 18
		},
		left: 35,
	});
	
	var filterBy = Ti.UI.createLabel({
		top:75,
		text: "Filter by:", 
		color: util.customTextColor,
		height: 30,
		font: {
			fontWeight: 'bold',
			fontSize: 18,
		},
		left: 5,
	});
	
	var searchBtn = Titanium.UI.createButton({
		top:5,
		width:150*wsf,
		height:75*hsf,
		right:10,
		borderRadius:1,
		backgroundImage:util.imagePath('search_button.png'),
	});
	
	staticView.add(allActivities);
	staticView.add(filterBy);
	staticView.add(selectActivities);
	selectActivity("select");
	
	var views = [];
	
	var table = Ti.UI.createTableView({
		top:50,
		separatorColor: 'transparent',
		backgroundColor:util.customBgColor,
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
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
	}	
module.exports = ExploreView;