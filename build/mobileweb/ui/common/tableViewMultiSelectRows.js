var createMenuRow = function(item) {
	var tablerow = Ti.UI.createTableViewRow({
		className: 'itemRow',
		category: item.split(" ")[0].toLowerCase(),
		
	});

	var titleView = Ti.UI.createView({
		backgroundColor: 'e5eaf0',
		height: 40,
		width: (util.app_width - 10),
		borderColor:'#e0e0e0',
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

function selectTableRow(table_data, index){

	for (var i = 0; i < table_data.length; i++){
		var section = table_data[i]; 
		for (var j = 0; j <  section.rowCount; j++){
			Ti.API.info("index " + j);
			Ti.API.info("bgcolor = " + section.rows[j].children[0].text);
		}
	}
}

function tableViewMultiSelectRows(params,arr)
{
	rows = []; 
    var table = Ti.UI.createTableView({
		top: 50,
	});
    for (var i = 0; i < params.length; i++){
    	rows.push(createMenuRow(params[i]));
    }
    
   	table.setData(rows);
    table.addEventListener('click',function(e){
        e.rowData.selected = !e.rowData.selected;            
        if(e.rowData.selected) {
            var pushed = arr.push(e.index);
            table.fireEvent('onrowselect',e);
        }else{
            var index = arr.indexOf(e.index);
            if(index>-1) {
                arr.splice(index,1);
                table.fireEvent('onrowunselect',e);
            }
        }
    });
    
    table.addEventListener('onrowselect', function(e){
    	selectTableRow(table.data, e.index);
    	Ti.API.info("Selected " + e.index);
    });

	table.addEventListener('onrowunselect', function(e){
    	Ti.API.info("Unselected " + e.index);
    });
    return table;
}

module.exports = tableViewMultiSelectRows; 