var createMenuRow = function(item) {
	var tableRow = Ti.UI.createTableViewRow({
		className: 'itemRow',
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

function selectTableRow(table_data, index){
		table_data[0].rows[index].backgroundColor = '#7b90ad';
}

function unSelectTableRow(table_data, index){
		table_data[0].rows[index].backgroundColor = '#e5eaf0';
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
    	//Ti.API.info("Selected " + e.index + e.rowData.selected);
    });

	table.addEventListener('onrowunselect', function(e){
    	unSelectTableRow(table.data, e.index);
    	//Ti.API.info("Unselected " + e.index);
    });
    return table;
}

module.exports = tableViewMultiSelectRows; 