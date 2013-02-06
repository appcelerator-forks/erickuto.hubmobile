var createMenuRow = function(item, className) {
	var tableRow = Ti.UI.createTableViewRow({
		className: className,
		category: item.split(" ")[0].toLowerCase(),
		backgroundColor: '#e5eaf0',
		width: (util.app_width - 10),
		height: 40, 
		left: 5,
		selected: false,
		borderColor:'#e0e0e0',
		borderWidth:1,
	});
	
	var titleLabel = Ti.UI.createLabel({
		text: item,
		left:5,
		color: '#5e656a',
		font: {
			fontSize: 16
		},
	});
	tableRow.add(titleLabel);
	
	return tableRow;
};

function clearData(_className){
	switch(_className){ 
		case "communities": 
			return hubAPI.user.clearGroupOptions();
		case "regions": 
			hubAPI.user.clearSubLocationsOptions();
			return hubAPI.user.clearCountriesOptions();
		case "countries":
			return hubAPI.user.clearSubLocationsOptions();
		default: 
			return; 
		}
}
function selectTableRow(table_data, index){
		table_row = table_data[0].rows[index];
		table_row.backgroundColor = '#7b90ad';
		
}

function unSelectTableRow(table_data, index){
		table_row = table_data[0].rows[index];
		table_row.backgroundColor = '#e5eaf0';
}
function tableViewMultiSelectRows(params,arr,className)
{
	rows = []; 
    var table = Ti.UI.createTableView({
		top: 50,
	});
    for (var i = 0; i < params.length; i++){
    	rows.push(createMenuRow(params[i], className));
    }
    
   	table.setData(rows);
   	
   	for (var j = 0; j < arr.length; j++){
    	selectTableRow(table.data, arr[j]);
    	table.data[0].rows[arr[j]].selected = true;
    }
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
    	clearData(e.rowData.className);
		
    });

	table.addEventListener('onrowunselect', function(e){
    	unSelectTableRow(table.data, e.index);
    	clearData(e.rowData.className);
    });
    return table;
}

module.exports = tableViewMultiSelectRows; 